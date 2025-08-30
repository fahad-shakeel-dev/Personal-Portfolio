// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import Project from '@/lib/models/Projects';
// import { dbConnect } from '@/lib/dbCon';
// import { uploadImage, deleteImage } from '@/lib/cloudinary';

// export async function GET(req) {
//   await dbConnect();
//   const { searchParams } = new URL(req.url);
//   const searchTerm = searchParams.get('searchTerm') || '';
//   const category = searchParams.get('category') || 'all';
//   const status = searchParams.get('status') || 'all';

//   try {
//     const query = {};

//     if (searchTerm) {
//       query.$or = [
//         { title: { $regex: searchTerm, $options: 'i' } },
//         { description: { $regex: searchTerm, $options: 'i' } },
//         { technologies: { $regex: searchTerm, $options: 'i' } },
//       ];
//     }

//     if (category && category !== 'all') {
//       query.category = category;
//     }

//     if (status && status !== 'all') {
//       query.status = status;
//     }

//     const projects = await Project.find(query).lean();

//     const formattedProjects = projects.map(project => ({
//       id: project._id.toString(),
//       title: project.title,
//       description: project.description,
//       category: project.category,
//       status: project.status,
//       technologies: project.technologies,
//       image: project.image,
//       liveUrl: project.liveUrl,
//       githubUrl: project.githubUrl,
//       createdDate: project.createdDate.toISOString().split('T')[0],
//       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
//       likes: project.likes,
//       views: project.views,
//     }));

//     return NextResponse.json({ success: true, data: formattedProjects }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }

// export async function POST(req) {
//   await dbConnect();
//   try {
//     let title, description, category, status, technologies, liveUrl, githubUrl, imageFile;
//     const contentType = req.headers.get('content-type') || '';

//     if (contentType.includes('multipart/form-data')) {
//       const formData = await req.formData();
//       title = formData.get('title');
//       description = formData.get('description');
//       category = formData.get('category');
//       status = formData.get('status');
//       technologies = formData.get('technologies')?.split(',').map(tech => tech.trim()).filter(Boolean) || [];
//       liveUrl = formData.get('liveUrl');
//       githubUrl = formData.get('githubUrl');
//       imageFile = formData.get('image');
//     } else if (contentType.includes('application/json')) {
//       const body = await req.json();
//       ({ title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile } = body);
//       technologies = technologies || [];
//     } else {
//       return NextResponse.json(
//         { success: false, error: 'Content-Type must be multipart/form-data or application/json' },
//         { status: 400 }
//       );
//     }

//     if (!title || !description || !category || !status || !technologies.length) {
//       return NextResponse.json({ success: false, error: 'Required fields are missing' }, { status: 400 });
//     }

//     let imageUrl = '/placeholder.svg';
//     if (imageFile && typeof imageFile !== 'string') {
//       const buffer = Buffer.from(await imageFile.arrayBuffer());
//       const base64 = buffer.toString('base64');
//       const dataUri = `data:${imageFile.type};base64,${base64}`;
//       imageUrl = await uploadImage(dataUri);
//     } else if (typeof imageFile === 'string' && imageFile) {
//       imageUrl = imageFile; // Use provided image URL for JSON requests
//     }

//     const project = new Project({
//       title,
//       description,
//       category,
//       status,
//       technologies,
//       image: imageUrl,
//       liveUrl: liveUrl || '',
//       githubUrl: githubUrl || '',
//       createdDate: new Date(),
//       completedDate: status === 'completed' ? new Date() : null,
//       likes: 0,
//       views: 0,
//     });

//     await project.save();

//     const formattedProject = {
//       id: project._id.toString(),
//       title: project.title,
//       description: project.description,
//       category: project.category,
//       status: project.status,
//       technologies: project.technologies,
//       image: project.image,
//       liveUrl: project.liveUrl,
//       githubUrl: project.githubUrl,
//       createdDate: project.createdDate.toISOString().split('T')[0],
//       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
//       likes: project.likes,
//       views: project.views,
//     };

//     return NextResponse.json({ success: true, data: formattedProject }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }

// export async function PUT(req) {
//   await dbConnect();
//   try {
//     let id, title, description, category, status, technologies, liveUrl, githubUrl, imageFile;
//     const contentType = req.headers.get('content-type') || '';

//     if (contentType.includes('multipart/form-data')) {
//       const formData = await req.formData();
//       id = formData.get('id');
//       title = formData.get('title');
//       description = formData.get('description');
//       category = formData.get('category');
//       status = formData.get('status');
//       technologies = formData.get('technologies')?.split(',').map(tech => tech.trim()).filter(Boolean) || [];
//       liveUrl = formData.get('liveUrl');
//       githubUrl = formData.get('githubUrl');
//       imageFile = formData.get('image');
//     } else if (contentType.includes('application/json')) {
//       const body = await req.json();
//       ({ id, title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile } = body);
//       technologies = technologies || [];
//     } else {
//       return NextResponse.json(
//         { success: false, error: 'Content-Type must be multipart/form-data or application/json' },
//         { status: 400 }
//       );
//     }

//     if (!id) {
//       return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
//     }

//     const project = await Project.findById(id);
//     if (!project) {
//       return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
//     }

//     let imageUrl = project.image;
//     if (imageFile && typeof imageFile !== 'string') {
//       if (project.image && !project.image.includes('placeholder.svg')) {
//         const publicId = project.image.split('/').pop().split('.')[0];
//         await deleteImage(`projects/${publicId}`);
//       }
//       const buffer = Buffer.from(await imageFile.arrayBuffer());
//       const base64 = buffer.toString('base64');
//       const dataUri = `data:${imageFile.type};base64,${base64}`;
//       imageUrl = await uploadImage(dataUri);
//     } else if (typeof imageFile === 'string' && imageFile) {
//       imageUrl = imageFile;
//     }

//     project.title = title || project.title;
//     project.description = description || project.description;
//     project.category = category || project.category;
//     project.status = status || project.status;
//     project.technologies = technologies.length ? technologies : project.technologies;
//     project.image = imageUrl;
//     project.liveUrl = liveUrl || project.liveUrl;
//     project.githubUrl = githubUrl || project.githubUrl;
//     project.completedDate = status === 'completed' && project.status !== 'completed' ? new Date() : project.completedDate;

//     await project.save();

//     const formattedProject = {
//       id: project._id.toString(),
//       title: project.title,
//       description: project.description,
//       category: project.category,
//       status: project.status,
//       technologies: project.technologies,
//       image: project.image,
//       liveUrl: project.liveUrl,
//       githubUrl: project.githubUrl,
//       createdDate: project.createdDate.toISOString().split('T')[0],
//       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
//       likes: project.likes,
//       views: project.views,
//     };

//     return NextResponse.json({ success: true, data: formattedProject }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }

// export async function DELETE(req) {
//   await dbConnect();
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get('id');

//   try {
//     if (!id) {
//       return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
//     }

//     const project = await Project.findById(id);
//     if (!project) {
//       return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
//     }

//     if (project.image && !project.image.includes('placeholder.svg')) {
//       const publicId = project.image.split('/').pop().split('.')[0];
//       await deleteImage(`projects/${publicId}`);
//     }

//     await Project.findByIdAndDelete(id);

//     return NextResponse.json({ success: true, message: 'Project deleted successfully' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }


























// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import Project from '@/lib/models/Projects';
// import { dbConnect } from '@/lib/dbCon';
// import { uploadImage, deleteImage, uploadImages, deleteImages } from '@/lib/cloudinary';

// export async function GET(req) {
//   await dbConnect();
//   const { searchParams } = new URL(req.url);
//   const searchTerm = searchParams.get('searchTerm') || '';
//   const category = searchParams.get('category') || 'all';
//   const status = searchParams.get('status') || 'all';

//   try {
//     const query = {};

//     if (searchTerm) {
//       query.$or = [
//         { title: { $regex: searchTerm, $options: 'i' } },
//         { description: { $regex: searchTerm, $options: 'i' } },
//         { technologies: { $regex: searchTerm, $options: 'i' } },
//       ];
//     }

//     if (category && category !== 'all') {
//       query.category = category;
//     }

//     if (status && status !== 'all') {
//       query.status = status;
//     }

//     const projects = await Project.find(query).lean();

//     const formattedProjects = projects.map(project => ({
//       id: project._id.toString(),
//       title: project.title,
//       description: project.description,
//       category: project.category,
//       status: project.status,
//       technologies: project.technologies,
//       image: project.image,
//       gallery: project.gallery || [],
//       liveUrl: project.liveUrl,
//       githubUrl: project.githubUrl,
//       createdDate: project.createdDate.toISOString().split('T')[0],
//       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
//       likes: project.likes,
//       views: project.views,
//     }));

//     return NextResponse.json({ success: true, data: formattedProjects }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }

// export async function POST(req) {
//   await dbConnect();
//   try {
//     let title, description, category, status, technologies, liveUrl, githubUrl, imageFile, galleryFiles;
//     const contentType = req.headers.get('content-type') || '';

//     if (contentType.includes('multipart/form-data')) {
//       const formData = await req.formData();
//       title = formData.get('title');
//       description = formData.get('description');
//       category = formData.get('category');
//       status = formData.get('status');
//       technologies = formData.get('technologies')?.split(',').map(tech => tech.trim()).filter(Boolean) || [];
//       liveUrl = formData.get('liveUrl');
//       githubUrl = formData.get('githubUrl');
//       imageFile = formData.get('image');
//       galleryFiles = formData.getAll('gallery'); // 👈 multiple gallery images
//     } else if (contentType.includes('application/json')) {
//       const body = await req.json();
//       ({ title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile, gallery: galleryFiles } = body);
//       technologies = technologies || [];
//       galleryFiles = galleryFiles || [];
//     } else {
//       return NextResponse.json(
//         { success: false, error: 'Content-Type must be multipart/form-data or application/json' },
//         { status: 400 }
//       );
//     }

//     if (!title || !description || !category || !status || !technologies.length) {
//       return NextResponse.json({ success: false, error: 'Required fields are missing' }, { status: 400 });
//     }

//     // Upload single main image
//     let imageUrl = '/placeholder.svg';
//     if (imageFile && typeof imageFile !== 'string') {
//       const buffer = Buffer.from(await imageFile.arrayBuffer());
//       const base64 = buffer.toString('base64');
//       const dataUri = `data:${imageFile.type};base64,${base64}`;
//       imageUrl = await uploadImage(dataUri);
//     } else if (typeof imageFile === 'string' && imageFile) {
//       imageUrl = imageFile;
//     }

//     // Upload gallery images
//     let galleryUrls = [];
//     if (galleryFiles && galleryFiles.length > 0) {
//       if (typeof galleryFiles[0] !== 'string') {
//         const buffers = await Promise.all(
//           galleryFiles.map(async file => {
//             const buffer = Buffer.from(await file.arrayBuffer());
//             const base64 = buffer.toString('base64');
//             return `data:${file.type};base64,${base64}`;
//           })
//         );
//         galleryUrls = await uploadImages(buffers);
//       } else {
//         galleryUrls = galleryFiles; // if array of URLs in JSON
//       }
//     }

//     const project = new Project({
//       title,
//       description,
//       category,
//       status,
//       technologies,
//       image: imageUrl,
//       gallery: galleryUrls,
//       liveUrl: liveUrl || '',
//       githubUrl: githubUrl || '',
//       createdDate: new Date(),
//       completedDate: status === 'completed' ? new Date() : null,
//       likes: 0,
//       views: 0,
//     });

//     await project.save();

//     const formattedProject = {
//       id: project._id.toString(),
//       title: project.title,
//       description: project.description,
//       category: project.category,
//       status: project.status,
//       technologies: project.technologies,
//       image: project.image,
//       gallery: project.gallery,
//       liveUrl: project.liveUrl,
//       githubUrl: project.githubUrl,
//       createdDate: project.createdDate.toISOString().split('T')[0],
//       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
//       likes: project.likes,
//       views: project.views,
//     };

//     return NextResponse.json({ success: true, data: formattedProject }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }

// export async function PUT(req) {
//   await dbConnect();
//   try {
//     let id, title, description, category, status, technologies, liveUrl, githubUrl, imageFile, galleryFiles;
//     const contentType = req.headers.get('content-type') || '';

//     if (contentType.includes('multipart/form-data')) {
//       const formData = await req.formData();
//       id = formData.get('id');
//       title = formData.get('title');
//       description = formData.get('description');
//       category = formData.get('category');
//       status = formData.get('status');
//       technologies = formData.get('technologies')?.split(',').map(tech => tech.trim()).filter(Boolean) || [];
//       liveUrl = formData.get('liveUrl');
//       githubUrl = formData.get('githubUrl');
//       imageFile = formData.get('image');
//       galleryFiles = formData.getAll('gallery');
//     } else if (contentType.includes('application/json')) {
//       const body = await req.json();
//       ({ id, title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile, gallery: galleryFiles } = body);
//       technologies = technologies || [];
//       galleryFiles = galleryFiles || [];
//     } else {
//       return NextResponse.json(
//         { success: false, error: 'Content-Type must be multipart/form-data or application/json' },
//         { status: 400 }
//       );
//     }

//     if (!id) {
//       return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
//     }

//     const project = await Project.findById(id);
//     if (!project) {
//       return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
//     }

//     // Update single image
//     let imageUrl = project.image;
//     if (imageFile && typeof imageFile !== 'string') {
//       if (project.image && !project.image.includes('placeholder.svg')) {
//         const publicId = project.image.split('/').pop().split('.')[0];
//         await deleteImage(`projects/${publicId}`);
//       }
//       const buffer = Buffer.from(await imageFile.arrayBuffer());
//       const base64 = buffer.toString('base64');
//       const dataUri = `data:${imageFile.type};base64,${base64}`;
//       imageUrl = await uploadImage(dataUri);
//     } else if (typeof imageFile === 'string' && imageFile) {
//       imageUrl = imageFile;
//     }

//     // Update gallery
//     let galleryUrls = project.gallery || [];
//     if (galleryFiles && galleryFiles.length > 0) {
//       if (typeof galleryFiles[0] !== 'string') {
//         const buffers = await Promise.all(
//           galleryFiles.map(async file => {
//             const buffer = Buffer.from(await file.arrayBuffer());
//             const base64 = buffer.toString('base64');
//             return `data:${file.type};base64,${base64}`;
//           })
//         );
//         galleryUrls = await uploadImages(buffers);
//       } else {
//         galleryUrls = galleryFiles;
//       }
//     }

//     project.title = title || project.title;
//     project.description = description || project.description;
//     project.category = category || project.category;
//     project.status = status || project.status;
//     project.technologies = technologies.length ? technologies : project.technologies;
//     project.image = imageUrl;
//     project.gallery = galleryUrls;
//     project.liveUrl = liveUrl || project.liveUrl;
//     project.githubUrl = githubUrl || project.githubUrl;
//     project.completedDate = status === 'completed' && project.status !== 'completed' ? new Date() : project.completedDate;

//     await project.save();

//     const formattedProject = {
//       id: project._id.toString(),
//       title: project.title,
//       description: project.description,
//       category: project.category,
//       status: project.status,
//       technologies: project.technologies,
//       image: project.image,
//       gallery: project.gallery,
//       liveUrl: project.liveUrl,
//       githubUrl: project.githubUrl,
//       createdDate: project.createdDate.toISOString().split('T')[0],
//       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
//       likes: project.likes,
//       views: project.views,
//     };

//     return NextResponse.json({ success: true, data: formattedProject }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }

// export async function DELETE(req) {
//   await dbConnect();
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get('id');

//   try {
//     if (!id) {
//       return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
//     }

//     const project = await Project.findById(id);
//     if (!project) {
//       return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
//     }

//     if (project.image && !project.image.includes('placeholder.svg')) {
//       const publicId = project.image.split('/').pop().split('.')[0];
//       await deleteImage(`projects/${publicId}`);
//     }

//     if (project.gallery && project.gallery.length > 0) {
//       const publicIds = project.gallery.map(url => url.split('/').pop().split('.')[0]);
//       await deleteImages(publicIds);
//     }

//     await Project.findByIdAndDelete(id);

//     return NextResponse.json({ success: true, message: 'Project deleted successfully' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }
















// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import Project from '@/lib/models/Projects';
// import { dbConnect } from '@/lib/dbCon';
// import { uploadImage, deleteImage, uploadImages, deleteImages } from '@/lib/cloudinary';

// export async function GET(req) {
//   await dbConnect();
//   const { searchParams } = new URL(req.url);
//   const searchTerm = searchParams.get('searchTerm') || '';
//   const category = searchParams.get('category') || 'all';
//   const status = searchParams.get('status') || 'all';

//   try {
//     const query = {};

//     if (searchTerm) {
//       query.$or = [
//         { title: { $regex: searchTerm, $options: 'i' } },
//         { description: { $regex: searchTerm, $options: 'i' } },
//         { technologies: { $regex: searchTerm, $options: 'i' } },
//       ];
//     }

//     if (category && category !== 'all') {
//       query.category = category;
//     }

//     if (status && status !== 'all') {
//       query.status = status;
//     }

//     const projects = await Project.find(query).lean();

//     const formattedProjects = projects.map(project => ({
//       id: project._id.toString(),
//       title: project.title,
//       description: project.description,
//       category: project.category,
//       status: project.status,
//       technologies: project.technologies,
//       image: project.image,
//       gallery: project.gallery || [],
//       features: project.features || [], // Add features
//       liveUrl: project.liveUrl,
//       githubUrl: project.githubUrl,
//       createdDate: project.createdDate.toISOString().split('T')[0],
//       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
//       likes: project.likes,
//       views: project.views,
//     }));

//     return NextResponse.json({ success: true, data: formattedProjects }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }

// export async function POST(req) {
//   await dbConnect();
//   try {
//     let title, description, category, status, technologies, liveUrl, githubUrl, imageFile, galleryFiles, features;
//     const contentType = req.headers.get('content-type') || '';

//     if (contentType.includes('multipart/form-data')) {
//       const formData = await req.formData();
//       title = formData.get('title');
//       description = formData.get('description');
//       category = formData.get('category');
//       status = formData.get('status');
//       technologies = formData.get('technologies')?.split(',').map(tech => tech.trim()).filter(Boolean) || [];
//       liveUrl = formData.get('liveUrl');
//       githubUrl = formData.get('githubUrl');
//       imageFile = formData.get('image');
//       galleryFiles = formData.getAll('gallery');
//       features = formData.getAll('features').filter(f => f.trim()); // Get features array
//     } else if (contentType.includes('application/json')) {
//       const body = await req.json();
//       ({ title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile, gallery: galleryFiles, features } = body);
//       technologies = technologies || [];
//       galleryFiles = galleryFiles || [];
//       features = features || [];
//     } else {
//       return NextResponse.json(
//         { success: false, error: 'Content-Type must be multipart/form-data or application/json' },
//         { status: 400 }
//       );
//     }

//     if (!title || !description || !category || !status || !technologies.length) {
//       return NextResponse.json({ success: false, error: 'Required fields are missing' }, { status: 400 });
//     }

//     // Upload single main image
//     let imageUrl = '/placeholder.svg';
//     if (imageFile && typeof imageFile !== 'string') {
//       const buffer = Buffer.from(await imageFile.arrayBuffer());
//       const base64 = buffer.toString('base64');
//       const dataUri = `data:${imageFile.type};base64,${base64}`;
//       imageUrl = await uploadImage(dataUri);
//     } else if (typeof imageFile === 'string' && imageFile) {
//       imageUrl = imageFile;
//     }

//     // Upload gallery images
//     let galleryUrls = [];
//     if (galleryFiles && galleryFiles.length > 0) {
//       if (typeof galleryFiles[0] !== 'string') {
//         const buffers = await Promise.all(
//           galleryFiles.map(async file => {
//             const buffer = Buffer.from(await file.arrayBuffer());
//             const base64 = buffer.toString('base64');
//             return `data:${file.type};base64,${base64}`;
//           })
//         );
//         galleryUrls = await uploadImages(buffers);
//       } else {
//         galleryUrls = galleryFiles;
//       }
//     }

//     const project = new Project({
//       title,
//       description,
//       category,
//       status,
//       technologies,
//       image: imageUrl,
//       gallery: galleryUrls,
//       features, // Save features
//       liveUrl: liveUrl || '',
//       githubUrl: githubUrl || '',
//       createdDate: new Date(),
//       completedDate: status === 'completed' ? new Date() : null,
//       likes: 0,
//       views: 0,
//     });

//     await project.save();

//     const formattedProject = {
//       id: project._id.toString(),
//       title: project.title,
//       description: project.description,
//       category: project.category,
//       status: project.status,
//       technologies: project.technologies,
//       image: project.image,
//       gallery: project.gallery,
//       features: project.features, // Include features
//       liveUrl: project.liveUrl,
//       githubUrl: project.githubUrl,
//       createdDate: project.createdDate.toISOString().split('T')[0],
//       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
//       likes: project.likes,
//       views: project.views,
//     };

//     return NextResponse.json({ success: true, data: formattedProject }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }

// export async function PUT(req) {
//   await dbConnect();
//   try {
//     let id, title, description, category, status, technologies, liveUrl, githubUrl, imageFile, galleryFiles, features;
//     const contentType = req.headers.get('content-type') || '';

//     if (contentType.includes('multipart/form-data')) {
//       const formData = await req.formData();
//       id = formData.get('id');
//       title = formData.get('title');
//       description = formData.get('description');
//       category = formData.get('category');
//       status = formData.get('status');
//       technologies = formData.get('technologies')?.split(',').map(tech => tech.trim()).filter(Boolean) || [];
//       liveUrl = formData.get('liveUrl');
//       githubUrl = formData.get('githubUrl');
//       imageFile = formData.get('image');
//       galleryFiles = formData.getAll('gallery');
//       features = formData.getAll('features').filter(f => f.trim()); // Get features array
//     } else if (contentType.includes('application/json')) {
//       const body = await req.json();
//       ({ id, title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile, gallery: galleryFiles, features } = body);
//       technologies = technologies || [];
//       galleryFiles = galleryFiles || [];
//       features = features || [];
//     } else {
//       return NextResponse.json(
//         { success: false, error: 'Content-Type must be multipart/form-data or application/json' },
//         { status: 400 }
//       );
//     }

//     if (!id) {
//       return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
//     }

//     const project = await Project.findById(id);
//     if (!project) {
//       return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
//     }

//     // Update single image
//     let imageUrl = project.image;
//     if (imageFile && typeof imageFile !== 'string') {
//       if (project.image && !project.image.includes('placeholder.svg')) {
//         const publicId = project.image.split('/').pop().split('.')[0];
//         await deleteImage(`projects/${publicId}`);
//       }
//       const buffer = Buffer.from(await imageFile.arrayBuffer());
//       const base64 = buffer.toString('base64');
//       const dataUri = `data:${imageFile.type};base64,${base64}`;
//       imageUrl = await uploadImage(dataUri);
//     } else if (typeof imageFile === 'string' && imageFile) {
//       imageUrl = imageFile;
//     }

//     // Update gallery
//     let galleryUrls = project.gallery || [];
//     if (galleryFiles && galleryFiles.length > 0) {
//       if (typeof galleryFiles[0] !== 'string') {
//         const buffers = await Promise.all(
//           galleryFiles.map(async file => {
//             const buffer = Buffer.from(await file.arrayBuffer());
//             const base64 = buffer.toString('base64');
//             return `data:${file.type};base64,${base64}`;
//           })
//         );
//         galleryUrls = await uploadImages(buffers);
//       } else {
//         galleryUrls = galleryFiles;
//       }
//     }

//     project.title = title || project.title;
//     project.description = description || project.description;
//     project.category = category || project.category;
//     project.status = status || project.status;
//     project.technologies = technologies.length ? technologies : project.technologies;
//     project.image = imageUrl;
//     project.gallery = galleryUrls;
//     project.features = features || project.features; // Update features
//     project.liveUrl = liveUrl || project.liveUrl;
//     project.githubUrl = githubUrl || project.githubUrl;
//     project.completedDate = status === 'completed' && project.status !== 'completed' ? new Date() : project.completedDate;

//     await project.save();

//     const formattedProject = {
//       id: project._id.toString(),
//       title: project.title,
//       description: project.description,
//       category: project.category,
//       status: project.status,
//       technologies: project.technologies,
//       image: project.image,
//       gallery: project.gallery,
//       features: project.features, // Include features
//       liveUrl: project.liveUrl,
//       githubUrl: project.githubUrl,
//       createdDate: project.createdDate.toISOString().split('T')[0],
//       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
//       likes: project.likes,
//       views: project.views,
//     };

//     return NextResponse.json({ success: true, data: formattedProject }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }

// export async function DELETE(req) {
//   await dbConnect();
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get('id');

//   try {
//     if (!id) {
//       return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
//     }

//     const project = await Project.findById(id);
//     if (!project) {
//       return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
//     }

//     if (project.image && !project.image.includes('placeholder.svg')) {
//       const publicId = project.image.split('/').pop().split('.')[0];
//       await deleteImage(`projects/${publicId}`);
//     }

//     if (project.gallery && project.gallery.length > 0) {
//       const publicIds = project.gallery.map(url => url.split('/').pop().split('.')[0]);
//       await deleteImages(publicIds);
//     }

//     await Project.findByIdAndDelete(id);

//     return NextResponse.json({ success: true, message: 'Project deleted successfully' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }












import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Project from '@/lib/models/Projects';
import { dbConnect } from '@/lib/dbCon';
import { uploadImage, deleteImage, uploadImages, deleteImages } from '@/lib/cloudinary';

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get('searchTerm') || '';
  const category = searchParams.get('category') || 'all';
  const status = searchParams.get('status') || 'all';

  try {
    const query = {};

    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { technologies: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    const projects = await Project.find(query).lean();

    const formattedProjects = projects.map(project => ({
      id: project._id.toString(),
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      technologies: project.technologies,
      image: project.image,
      gallery: project.gallery || [],
      features: project.features || [],
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      createdDate: project.createdDate.toISOString().split('T')[0],
      completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
      likes: project.likes,
      views: project.views,
    }));

    return NextResponse.json({ success: true, data: formattedProjects }, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    let title, description, category, status, technologies, liveUrl, githubUrl, imageFile, galleryFiles, features;
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      title = formData.get('title');
      description = formData.get('description');
      category = formData.get('category');
      status = formData.get('status');
      technologies = formData.get('technologies')?.split(',').map(tech => tech.trim()).filter(Boolean) || [];
      liveUrl = formData.get('liveUrl');
      githubUrl = formData.get('githubUrl');
      imageFile = formData.get('image');
      galleryFiles = formData.getAll('gallery');
      features = formData.getAll('features').filter(f => f.trim());
    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      ({ title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile, gallery: galleryFiles, features } = body);
      technologies = technologies || [];
      galleryFiles = galleryFiles || [];
      features = features || [];
    } else {
      return NextResponse.json(
        { success: false, error: 'Content-Type must be multipart/form-data or application/json' },
        { status: 400 }
      );
    }

    if (!title || !description || !category || !status || !technologies.length) {
      return NextResponse.json({ success: false, error: 'Required fields are missing' }, { status: 400 });
    }

    // Upload single main image
    let imageUrl = '/placeholder.svg';
    if (imageFile && typeof imageFile !== 'string') {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = buffer.toString('base64');
      const dataUri = `data:${imageFile.type};base64,${base64}`;
      imageUrl = await uploadImage(dataUri);
    } else if (typeof imageFile === 'string' && imageFile) {
      imageUrl = imageFile;
    }

    // Upload gallery images
    let galleryUrls = [];
    if (galleryFiles && galleryFiles.length > 0) {
      if (typeof galleryFiles[0] !== 'string') {
        const buffers = await Promise.all(
          galleryFiles.map(async file => {
            const buffer = Buffer.from(await file.arrayBuffer());
            const base64 = buffer.toString('base64');
            return `data:${file.type};base64,${base64}`;
          })
        );
        galleryUrls = await uploadImages(buffers);
      } else {
        galleryUrls = galleryFiles;
      }
    }

    const project = new Project({
      title,
      description,
      category,
      status,
      technologies,
      image: imageUrl,
      gallery: galleryUrls,
      features,
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      createdDate: new Date(),
      completedDate: status === 'completed' ? new Date() : null,
      likes: 0,
      views: 0,
    });

    await project.save();
    console.log('Project Created:', { id: project._id.toString(), status, completedDate: project.completedDate });

    const formattedProject = {
      id: project._id.toString(),
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      technologies: project.technologies,
      image: project.image,
      gallery: project.gallery,
      features: project.features,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      createdDate: project.createdDate.toISOString().split('T')[0],
      completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
      likes: project.likes,
      views: project.views,
    };

    return NextResponse.json({ success: true, data: formattedProject }, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req) {
  await dbConnect();
  try {
    let id, title, description, category, status, technologies, liveUrl, githubUrl, imageFile, galleryFiles, features;
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      id = formData.get('id');
      title = formData.get('title');
      description = formData.get('description');
      category = formData.get('category');
      status = formData.get('status');
      technologies = formData.get('technologies')?.split(',').map(tech => tech.trim()).filter(Boolean) || [];
      liveUrl = formData.get('liveUrl');
      githubUrl = formData.get('githubUrl');
      imageFile = formData.get('image');
      galleryFiles = formData.getAll('gallery');
      features = formData.getAll('features').filter(f => f.trim());
    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      ({ id, title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile, gallery: galleryFiles, features } = body);
      technologies = technologies || [];
      galleryFiles = galleryFiles || [];
      features = features || [];
    } else {
      return NextResponse.json(
        { success: false, error: 'Content-Type must be multipart/form-data or application/json' },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
    }

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    // Update single image
    let imageUrl = project.image;
    if (imageFile && typeof imageFile !== 'string') {
      if (project.image && !project.image.includes('placeholder.svg')) {
        const publicId = project.image.split('/').pop().split('.')[0];
        await deleteImage(`projects/${publicId}`);
      }
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = buffer.toString('base64');
      const dataUri = `data:${imageFile.type};base64,${base64}`;
      imageUrl = await uploadImage(dataUri);
    } else if (typeof imageFile === 'string' && imageFile) {
      imageUrl = imageFile;
    }

    // Update gallery
    let galleryUrls = project.gallery || [];
    if (galleryFiles && galleryFiles.length > 0) {
      if (typeof galleryFiles[0] !== 'string') {
        if (project.gallery && project.gallery.length > 0) {
          const publicIds = project.gallery.map(url => url.split('/').pop().split('.')[0]);
          await deleteImages(publicIds);
        }
        const buffers = await Promise.all(
          galleryFiles.map(async file => {
            const buffer = Buffer.from(await file.arrayBuffer());
            const base64 = buffer.toString('base64');
            return `data:${file.type};base64,${base64}`;
          })
        );
        galleryUrls = await uploadImages(buffers);
      } else {
        galleryUrls = galleryFiles;
      }
    }

    // Update completedDate based on status
    const newCompletedDate = status === 'completed' ? new Date() : project.status === 'completed' ? null : project.completedDate;

    project.title = title || project.title;
    project.description = description || project.description;
    project.category = category || project.category;
    project.status = status || project.status;
    project.technologies = technologies.length ? technologies : project.technologies;
    project.image = imageUrl;
    project.gallery = galleryUrls;
    project.features = features || project.features;
    project.liveUrl = liveUrl || project.liveUrl;
    project.githubUrl = githubUrl || project.githubUrl;
    project.completedDate = newCompletedDate;

    await project.save();
    console.log('Project Updated:', { id: project._id.toString(), status, completedDate: project.completedDate });

    const formattedProject = {
      id: project._id.toString(),
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      technologies: project.technologies,
      image: project.image,
      gallery: project.gallery,
      features: project.features,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      createdDate: project.createdDate.toISOString().split('T')[0],
      completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
      likes: project.likes,
      views: project.views,
    };

    return NextResponse.json({ success: true, data: formattedProject }, { status: 200 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (!id) {
      return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
    }

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    if (project.image && !project.image.includes('placeholder.svg')) {
      const publicId = project.image.split('/').pop().split('.')[0];
      await deleteImage(`projects/${publicId}`);
    }

    if (project.gallery && project.gallery.length > 0) {
      const publicIds = project.gallery.map(url => url.split('/').pop().split('.')[0]);
      await deleteImages(publicIds);
    }

    await Project.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}