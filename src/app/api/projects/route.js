// // import { NextResponse } from 'next/server';
// // import mongoose from 'mongoose';
// // import Project from '@/lib/models/Projects';
// // import Like from '@/lib/models/Like'; // Import the Like model
// // import { dbConnect } from '@/lib/dbCon';
// // import { uploadImage, deleteImage, uploadImages, deleteImages } from '@/lib/cloudinary';

// // export async function GET(req) {
// //   await dbConnect();
// //   const { searchParams } = new URL(req.url);
// //   const searchTerm = searchParams.get('searchTerm') || '';
// //   const category = searchParams.get('category') || 'all';
// //   const status = searchParams.get('status') || 'all';
// //   const userId = searchParams.get('userId'); // Added to get userId for view tracking

// //   try {
// //     const query = {};

// //     if (searchTerm) {
// //       query.$or = [
// //         { title: { $regex: searchTerm, $options: 'i' } },
// //         { description: { $regex: searchTerm, $options: 'i' } },
// //         { technologies: { $regex: searchTerm, $options: 'i' } },
// //       ];
// //     }

// //     if (category && category !== 'all') {
// //       query.category = category;
// //     }

// //     if (status && status !== 'all') {
// //       query.status = status;
// //     }

// //     const projects = await Project.find(query).lean();

// //     // Aggregate likes count for each project
// //     const projectIds = projects.map(project => project._id);
// //     const likesCount = await Like.aggregate([
// //       { $match: { targetType: "project", targetId: { $in: projectIds } } },
// //       { $group: { _id: "$targetId", count: { $sum: 1 } } },
// //     ]);

// //     const likesMap = new Map(likesCount.map(item => [item._id.toString(), item.count]));

// //     const formattedProjects = projects.map(project => ({
// //       id: project._id.toString(),
// //       title: project.title,
// //       description: project.description,
// //       category: project.category,
// //       status: project.status,
// //       technologies: project.technologies,
// //       image: project.image,
// //       gallery: project.gallery || [],
// //       liveUrl: project.liveUrl,
// //       githubUrl: project.githubUrl,
// //       createdDate: project.createdDate.toISOString().split('T')[0],
// //       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
// //       likes: likesMap.get(project._id.toString()) || 0, // Use aggregated likes count
// //       views: project.views,
// //       userHasLiked: userId ? project.likedBy?.includes(userId) : false, // Include like status
// //       viewedBy: project.viewedBy || [], // Include viewedBy for tracking
// //     }));

// //     return NextResponse.json({ success: true, data: formattedProjects }, { status: 200 });
// //   } catch (error) {
// //     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
// //   }
// // }

// // export async function POST(req) {
// //   await dbConnect();
// //   try {
// //     let title, description, category, status, technologies, liveUrl, githubUrl, imageFile, galleryFiles;
// //     const contentType = req.headers.get('content-type') || '';

// //     if (contentType.includes('multipart/form-data')) {
// //       const formData = await req.formData();
// //       title = formData.get('title');
// //       description = formData.get('description');
// //       category = formData.get('category');
// //       status = formData.get('status');
// //       technologies = formData.get('technologies')?.split(',').map(tech => tech.trim()).filter(Boolean) || [];
// //       liveUrl = formData.get('liveUrl');
// //       githubUrl = formData.get('githubUrl');
// //       imageFile = formData.get('image');
// //       galleryFiles = formData.getAll('gallery');
// //     } else if (contentType.includes('application/json')) {
// //       const body = await req.json();
// //       ({ title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile, gallery: galleryFiles } = body);
// //       technologies = technologies || [];
// //       galleryFiles = galleryFiles || [];
// //     } else {
// //       return NextResponse.json(
// //         { success: false, error: 'Content-Type must be multipart/form-data or application/json' },
// //         { status: 400 }
// //       );
// //     }

// //     if (!title || !description || !category || !status || !technologies.length) {
// //       return NextResponse.json({ success: false, error: 'Required fields are missing' }, { status: 400 });
// //     }

// //     let imageUrl = '/placeholder.svg';
// //     if (imageFile && typeof imageFile !== 'string') {
// //       const buffer = Buffer.from(await imageFile.arrayBuffer());
// //       const base64 = buffer.toString('base64');
// //       const dataUri = `data:${imageFile.type};base64,${base64}`;
// //       imageUrl = await uploadImage(dataUri);
// //     } else if (typeof imageFile === 'string' && imageFile) {
// //       imageUrl = imageFile;
// //     }

// //     let galleryUrls = [];
// //     if (galleryFiles && galleryFiles.length > 0) {
// //       if (typeof galleryFiles[0] !== 'string') {
// //         const buffers = await Promise.all(
// //           galleryFiles.map(async file => {
// //             const buffer = Buffer.from(await file.arrayBuffer());
// //             const base64 = buffer.toString('base64');
// //             return `data:${file.type};base64,${base64}`;
// //           })
// //         );
// //         galleryUrls = await uploadImages(buffers);
// //       } else {
// //         galleryUrls = galleryFiles;
// //       }
// //     }

// //     const project = new Project({
// //       title,
// //       description,
// //       category,
// //       status,
// //       technologies,
// //       image: imageUrl,
// //       gallery: galleryUrls,
// //       liveUrl: liveUrl || '',
// //       githubUrl: githubUrl || '',
// //       createdDate: new Date(),
// //       completedDate: status === 'completed' ? new Date() : null,
// //       likes: 0, // Initial likes set to 0, will be updated by GET aggregation
// //       views: 0,
// //       viewedBy: [],
// //       likedBy: [], // Added to track users who liked
// //     });

// //     await project.save();

// //     const formattedProject = {
// //       id: project._id.toString(),
// //       title: project.title,
// //       description: project.description,
// //       category: project.category,
// //       status: project.status,
// //       technologies: project.technologies,
// //       image: project.image,
// //       gallery: project.gallery,
// //       liveUrl: project.liveUrl,
// //       githubUrl: project.githubUrl,
// //       createdDate: project.createdDate.toISOString().split('T')[0],
// //       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
// //       likes: 0, // Initial likes, will be updated by GET
// //       views: project.views,
// //       viewedBy: project.viewedBy,
// //       likedBy: project.likedBy,
// //     };

// //     return NextResponse.json({ success: true, data: formattedProject }, { status: 201 });
// //   } catch (error) {
// //     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
// //   }
// // }

// // export async function PUT(req) {
// //   await dbConnect();
// //   try {
// //     let id, title, description, category, status, technologies, liveUrl, githubUrl, imageFile, galleryFiles;
// //     const contentType = req.headers.get('content-type') || '';

// //     if (contentType.includes('multipart/form-data')) {
// //       const formData = await req.formData();
// //       id = formData.get('id');
// //       title = formData.get('title');
// //       description = formData.get('description');
// //       category = formData.get('category');
// //       status = formData.get('status');
// //       technologies = formData.get('technologies')?.split(',').map(tech => tech.trim()).filter(Boolean) || [];
// //       liveUrl = formData.get('liveUrl');
// //       githubUrl = formData.get('githubUrl');
// //       imageFile = formData.get('image');
// //       galleryFiles = formData.getAll('gallery');
// //     } else if (contentType.includes('application/json')) {
// //       const body = await req.json();
// //       ({ id, title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile, gallery: galleryFiles } = body);
// //       technologies = technologies || [];
// //       galleryFiles = galleryFiles || [];
// //     } else {
// //       return NextResponse.json(
// //         { success: false, error: 'Content-Type must be multipart/form-data or application/json' },
// //         { status: 400 }
// //       );
// //     }

// //     if (!id) {
// //       return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
// //     }

// //     const project = await Project.findById(id);
// //     if (!project) {
// //       return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
// //     }

// //     let imageUrl = project.image;
// //     if (imageFile && typeof imageFile !== 'string') {
// //       if (project.image && !project.image.includes('placeholder.svg')) {
// //         const publicId = project.image.split('/').pop().split('.')[0];
// //         await deleteImage(`projects/${publicId}`);
// //       }
// //       const buffer = Buffer.from(await imageFile.arrayBuffer());
// //       const base64 = buffer.toString('base64');
// //       const dataUri = `data:${imageFile.type};base64,${base64}`;
// //       imageUrl = await uploadImage(dataUri);
// //     } else if (typeof imageFile === 'string' && imageFile) {
// //       imageUrl = imageFile;
// //     }

// //     let galleryUrls = project.gallery || [];
// //     if (galleryFiles && galleryFiles.length > 0) {
// //       if (typeof galleryFiles[0] !== 'string') {
// //         if (project.gallery && project.gallery.length > 0) {
// //           const publicIds = project.gallery.map(url => url.split('/').pop().split('.')[0]);
// //           await deleteImages(publicIds);
// //         }
// //         const buffers = await Promise.all(
// //           galleryFiles.map(async file => {
// //             const buffer = Buffer.from(await file.arrayBuffer());
// //             const base64 = buffer.toString('base64');
// //             return `data:${file.type};base64,${base64}`;
// //           })
// //         );
// //         galleryUrls = await uploadImages(buffers);
// //       } else {
// //         galleryUrls = galleryFiles;
// //       }
// //     }

// //     project.title = title || project.title;
// //     project.description = description || project.description;
// //     project.category = category || project.category;
// //     project.status = status || project.status;
// //     project.technologies = technologies.length ? technologies : project.technologies;
// //     project.image = imageUrl;
// //     project.gallery = galleryUrls;
// //     project.liveUrl = liveUrl || project.liveUrl;
// //     project.githubUrl = githubUrl || project.githubUrl;
// //     if (status === 'completed' && project.status !== 'completed') {
// //       project.completedDate = new Date();
// //     } else if (status !== 'completed' && project.status === 'completed') {
// //       project.completedDate = null;
// //     }

// //     await project.save();

// //     const formattedProject = {
// //       id: project._id.toString(),
// //       title: project.title,
// //       description: project.description,
// //       category: project.category,
// //       status: project.status,
// //       technologies: project.technologies,
// //       image: project.image,
// //       gallery: project.gallery,
// //       liveUrl: project.liveUrl,
// //       githubUrl: project.githubUrl,
// //       createdDate: project.createdDate.toISOString().split('T')[0],
// //       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
// //       likes: 0, // Initial likes, will be updated by GET
// //       views: project.views,
// //       viewedBy: project.viewedBy,
// //       likedBy: project.likedBy,
// //     };

// //     return NextResponse.json({ success: true, data: formattedProject }, { status: 200 });
// //   } catch (error) {
// //     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
// //   }
// // }

// // export async function PATCH(req) {
// //   await dbConnect();
// //   try {
// //     const { id, userId } = await req.json();

// //     if (!id || !userId) {
// //       return NextResponse.json({ success: false, error: 'Project ID and user ID are required' }, { status: 400 });
// //     }

// //     const project = await Project.findById(id);
// //     if (!project) {
// //       return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
// //     }

// //     // Check if user has already viewed the project
// //     if (!project.viewedBy.includes(userId)) {
// //       project.views += 1;
// //       project.viewedBy.push(userId);
// //       await project.save();
// //     }

// //     const formattedProject = {
// //       id: project._id.toString(),
// //       title: project.title,
// //       description: project.description,
// //       category: project.category,
// //       status: project.status,
// //       technologies: project.technologies,
// //       image: project.image,
// //       gallery: project.gallery,
// //       liveUrl: project.liveUrl,
// //       githubUrl: project.githubUrl,
// //       createdDate: project.createdDate.toISOString().split('T')[0],
// //       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
// //       likes: project.likes,
// //       views: project.views,
// //       viewedBy: project.viewedBy,
// //       likedBy: project.likedBy,
// //     };

// //     return NextResponse.json({ success: true, data: formattedProject }, { status: 200 });
// //   } catch (error) {
// //     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
// //   }
// // }

// // export async function DELETE(req) {
// //   await dbConnect();
// //   const { searchParams } = new URL(req.url);
// //   const id = searchParams.get('id');

// //   try {
// //     if (!id) {
// //       return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
// //     }

// //     const project = await Project.findById(id);
// //     if (!project) {
// //       return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
// //     }

// //     if (project.image && !project.image.includes('placeholder.svg')) {
// //       const publicId = project.image.split('/').pop().split('.')[0];
// //       await deleteImage(`projects/${publicId}`);
// //     }

// //     if (project.gallery && project.gallery.length > 0) {
// //       const publicIds = project.gallery.map(url => url.split('/').pop().split('.')[0]);
// //       await deleteImages(publicIds);
// //     }

// //     await Project.findByIdAndDelete(id);

// //     return NextResponse.json({ success: true, message: 'Project deleted successfully' }, { status: 200 });
// //   } catch (error) {
// //     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
// //   }
// // }

// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import Project from '@/lib/models/Projects';
// import Like from '@/lib/models/Like';
// import { dbConnect } from '@/lib/dbCon';
// import { uploadImage, deleteImage, uploadImages, deleteImages } from '@/lib/cloudinary';

// export async function GET(req) {
//   await dbConnect();
//   const { searchParams } = new URL(req.url);
//   const searchTerm = searchParams.get('searchTerm') || '';
//   const category = searchParams.get('category') || 'all';
//   const status = searchParams.get('status') || 'all';
//   const userId = searchParams.get('userId');

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

//     const projectIds = projects.map(project => project._id);
//     const likesCount = await Like.aggregate([
//       { $match: { targetType: "project", targetId: { $in: projectIds } } },
//       { $group: { _id: "$targetId", count: { $sum: 1 } } },
//     ]);

//     const likesMap = new Map(likesCount.map(item => [item._id.toString(), item.count]));

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
//       likes: likesMap.get(project._id.toString()) || 0,
//       views: project.views,
//       userHasLiked: userId ? project.likedBy?.includes(userId) : false,
//       viewedBy: project.viewedBy || [],
//       features: project.features || [],
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
//       features = formData.getAll('features').filter(feature => feature.trim());
//       liveUrl = formData.get('liveUrl');
//       githubUrl = formData.get('githubUrl');
//       imageFile = formData.get('image');
//       galleryFiles = formData.getAll('gallery');
//     } else if (contentType.includes('application/json')) {
//       const body = await req.json();
//       ({ title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile, gallery: galleryFiles, features } = body);
//       technologies = technologies || [];
//       features = features || [];
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

//     let imageUrl = '/placeholder.svg';
//     if (imageFile && typeof imageFile !== 'string') {
//       const buffer = Buffer.from(await imageFile.arrayBuffer());
//       const base64 = buffer.toString('base64');
//       const dataUri = `data:${imageFile.type};base64,${base64}`;
//       imageUrl = await uploadImage(dataUri);
//     } else if (typeof imageFile === 'string' && imageFile) {
//       imageUrl = imageFile;
//     }

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
//       features: features || [],
//       image: imageUrl,
//       gallery: galleryUrls,
//       liveUrl: liveUrl || '',
//       githubUrl: githubUrl || '',
//       createdDate: new Date(),
//       completedDate: status === 'completed' ? new Date() : null,
//       likes: 0,
//       views: 0,
//       viewedBy: [],
//       likedBy: [],
//     });

//     await project.save();

//     const formattedProject = {
//       id: project._id.toString(),
//       title: project.title,
//       description: project.description,
//       category: project.category,
//       status: project.status,
//       technologies: project.technologies,
//       features: project.features,
//       image: project.image,
//       gallery: project.gallery,
//       liveUrl: project.liveUrl,
//       githubUrl: project.githubUrl,
//       createdDate: project.createdDate.toISOString().split('T')[0],
//       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
//       likes: 0,
//       views: project.views,
//       viewedBy: project.viewedBy,
//       likedBy: project.likedBy,
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
//       features = formData.getAll('features').filter(feature => feature.trim());
//       liveUrl = formData.get('liveUrl');
//       githubUrl = formData.get('githubUrl');
//       imageFile = formData.get('image');
//       galleryFiles = formData.getAll('gallery');
//     } else if (contentType.includes('application/json')) {
//       const body = await req.json();
//       ({ id, title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile, gallery: galleryFiles, features } = body);
//       technologies = technologies || [];
//       features = features || [];
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

//     let galleryUrls = project.gallery || [];
//     if (galleryFiles && galleryFiles.length > 0) {
//       if (typeof galleryFiles[0] !== 'string') {
//         if (project.gallery && project.gallery.length > 0) {
//           const publicIds = project.gallery.map(url => url.split('/').pop().split('.')[0]);
//           await deleteImages(publicIds);
//         }
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
//     project.features = features.length ? features : project.features;
//     project.image = imageUrl;
//     project.gallery = galleryUrls;
//     project.liveUrl = liveUrl || project.liveUrl;
//     project.githubUrl = githubUrl || project.githubUrl;
//     if (status === 'completed' && project.status !== 'completed') {
//       project.completedDate = new Date();
//     } else if (status !== 'completed' && project.status === 'completed') {
//       project.completedDate = null;
//     }

//     await project.save();

//     const formattedProject = {
//       id: project._id.toString(),
//       title: project.title,
//       description: project.description,
//       category: project.category,
//       status: project.status,
//       technologies: project.technologies,
//       features: project.features,
//       image: project.image,
//       gallery: project.gallery,
//       liveUrl: project.liveUrl,
//       githubUrl: project.githubUrl,
//       createdDate: project.createdDate.toISOString().split('T')[0],
//       completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
//       likes: 0,
//       views: project.views,
//       viewedBy: project.viewedBy,
//       likedBy: project.likedBy,
//     };

//     return NextResponse.json({ success: true, data: formattedProject }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }

// export async function PATCH(req) {
//   await dbConnect();
//   try {
//     const { id, userId } = await req.json();

//     if (!id || !userId) {
//       return NextResponse.json({ success: false, error: 'Project ID and user ID are required' }, { status: 400 });
//     }

//     const project = await Project.findById(id);
//     if (!project) {
//       return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
//     }

//     if (!project.viewedBy.includes(userId)) {
//       project.views += 1;
//       project.viewedBy.push(userId);
//       await project.save();
//     }

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
//       viewedBy: project.viewedBy,
//       likedBy: project.likedBy,
//       features: project.features,
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
import Like from '@/lib/models/Like';
import { dbConnect } from '@/lib/dbCon';
import { uploadImage, deleteImage, uploadImages, deleteImages } from '@/lib/cloudinary';

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get('searchTerm') || '';
  const category = searchParams.get('category') || 'all';
  const status = searchParams.get('status') || 'all';
  const userId = searchParams.get('userId');

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

    const projectIds = projects.map(project => project._id);
    const likesCount = await Like.aggregate([
      { $match: { targetType: "project", targetId: { $in: projectIds } } },
      { $group: { _id: "$targetId", count: { $sum: 1 } } },
    ]);

    const likesMap = new Map(likesCount.map(item => [item._id.toString(), item.count]));

    const formattedProjects = projects.map(project => ({
      id: project._id.toString(),
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      technologies: project.technologies,
      image: project.image,
      gallery: project.gallery || [],
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      createdDate: project.createdDate ? project.createdDate.toISOString().split('T')[0] : null,
      completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
      likes: likesMap.get(project._id.toString()) || 0,
      views: project.views,
      userHasLiked: userId ? project.likedBy?.includes(userId) : false,
      viewedBy: project.viewedBy || [],
      features: project.features || [],
    }));

    return NextResponse.json({ success: true, data: formattedProjects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    let title, description, category, status, technologies, liveUrl, githubUrl, imageFile, galleryFiles, features, createdDate, completedDate;
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      title = formData.get('title');
      description = formData.get('description');
      category = formData.get('category');
      status = formData.get('status');
      technologies = formData.get('technologies')?.split(',').map(tech => tech.trim()).filter(Boolean) || [];
      features = formData.getAll('features').filter(feature => feature.trim());
      liveUrl = formData.get('liveUrl');
      githubUrl = formData.get('githubUrl');
      imageFile = formData.get('image');
      galleryFiles = formData.getAll('gallery');
      createdDate = formData.get('createdDate');
      completedDate = formData.get('completedDate');
    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      ({ title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile, gallery: galleryFiles, features, createdDate, completedDate } = body);
      technologies = technologies || [];
      features = features || [];
      galleryFiles = galleryFiles || [];
    } else {
      return NextResponse.json(
        { success: false, error: 'Content-Type must be multipart/form-data or application/json' },
        { status: 400 }
      );
    }

    if (!title || !description || !category || !status || !technologies.length || !createdDate) {
      return NextResponse.json({ success: false, error: 'Required fields are missing' }, { status: 400 });
    }

    let imageUrl = '/placeholder.svg';
    if (imageFile && typeof imageFile !== 'string') {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = buffer.toString('base64');
      const dataUri = `data:${imageFile.type};base64,${base64}`;
      imageUrl = await uploadImage(dataUri);
    } else if (typeof imageFile === 'string' && imageFile) {
      imageUrl = imageFile;
    }

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
      features: features || [],
      image: imageUrl,
      gallery: galleryUrls,
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      createdDate: createdDate ? new Date(createdDate) : new Date(),
      completedDate: status === 'completed' && completedDate ? new Date(completedDate) : null,
      likes: 0,
      views: 0,
      viewedBy: [],
      likedBy: [],
    });

    await project.save();

    const formattedProject = {
      id: project._id.toString(),
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      technologies: project.technologies,
      features: project.features,
      image: project.image,
      gallery: project.gallery,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      createdDate: project.createdDate ? project.createdDate.toISOString().split('T')[0] : null,
      completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
      likes: 0,
      views: project.views,
      viewedBy: project.viewedBy,
      likedBy: project.likedBy,
    };

    return NextResponse.json({ success: true, data: formattedProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req) {
  await dbConnect();
  try {
    let id, title, description, category, status, technologies, liveUrl, githubUrl, imageFile, galleryFiles, features, createdDate, completedDate;
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      id = formData.get('id');
      title = formData.get('title');
      description = formData.get('description');
      category = formData.get('category');
      status = formData.get('status');
      technologies = formData.get('technologies')?.split(',').map(tech => tech.trim()).filter(Boolean) || [];
      features = formData.getAll('features').filter(feature => feature.trim());
      liveUrl = formData.get('liveUrl');
      githubUrl = formData.get('githubUrl');
      imageFile = formData.get('image');
      galleryFiles = formData.getAll('gallery');
      createdDate = formData.get('createdDate');
      completedDate = formData.get('completedDate');
    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      ({ id, title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile, gallery: galleryFiles, features, createdDate, completedDate } = body);
      technologies = technologies || [];
      features = features || [];
      galleryFiles = galleryFiles || [];
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

    project.title = title || project.title;
    project.description = description || project.description;
    project.category = category || project.category;
    project.status = status || project.status;
    project.technologies = technologies.length ? technologies : project.technologies;
    project.features = features.length ? features : project.features;
    project.image = imageUrl;
    project.gallery = galleryUrls;
    project.liveUrl = liveUrl || project.liveUrl;
    project.githubUrl = githubUrl || project.githubUrl;
    project.createdDate = createdDate ? new Date(createdDate) : project.createdDate;
    project.completedDate = status === 'completed' && completedDate ? new Date(completedDate) : (status !== 'completed' ? null : project.completedDate);

    await project.save();

    const formattedProject = {
      id: project._id.toString(),
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      technologies: project.technologies,
      features: project.features,
      image: project.image,
      gallery: project.gallery,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      createdDate: project.createdDate ? project.createdDate.toISOString().split('T')[0] : null,
      completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
      likes: 0,
      views: project.views,
      viewedBy: project.viewedBy,
      likedBy: project.likedBy,
    };

    return NextResponse.json({ success: true, data: formattedProject }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  await dbConnect();
  try {
    const { id, userId } = await req.json();

    if (!id || !userId) {
      return NextResponse.json({ success: false, error: 'Project ID and user ID are required' }, { status: 400 });
    }

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    if (!project.viewedBy.includes(userId)) {
      project.views += 1;
      project.viewedBy.push(userId);
      await project.save();
    }

    const formattedProject = {
      id: project._id.toString(),
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      technologies: project.technologies,
      image: project.image,
      gallery: project.gallery,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      createdDate: project.createdDate ? project.createdDate.toISOString().split('T')[0] : null,
      completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
      likes: project.likes,
      views: project.views,
      viewedBy: project.viewedBy,
      likedBy: project.likedBy,
      features: project.features,
    };

    return NextResponse.json({ success: true, data: formattedProject }, { status: 200 });
  } catch (error) {
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
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}