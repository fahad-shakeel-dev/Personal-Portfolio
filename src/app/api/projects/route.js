import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Project from '@/lib/models/Projects';
import { dbConnect } from '@/lib/dbCon';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

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
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      createdDate: project.createdDate.toISOString().split('T')[0],
      completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
      likes: project.likes,
      views: project.views,
    }));

    return NextResponse.json({ success: true, data: formattedProjects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    let title, description, category, status, technologies, liveUrl, githubUrl, imageFile;
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
    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      ({ title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile } = body);
      technologies = technologies || [];
    } else {
      return NextResponse.json(
        { success: false, error: 'Content-Type must be multipart/form-data or application/json' },
        { status: 400 }
      );
    }

    if (!title || !description || !category || !status || !technologies.length) {
      return NextResponse.json({ success: false, error: 'Required fields are missing' }, { status: 400 });
    }

    let imageUrl = '/placeholder.svg';
    if (imageFile && typeof imageFile !== 'string') {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = buffer.toString('base64');
      const dataUri = `data:${imageFile.type};base64,${base64}`;
      imageUrl = await uploadImage(dataUri);
    } else if (typeof imageFile === 'string' && imageFile) {
      imageUrl = imageFile; // Use provided image URL for JSON requests
    }

    const project = new Project({
      title,
      description,
      category,
      status,
      technologies,
      image: imageUrl,
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      createdDate: new Date(),
      completedDate: status === 'completed' ? new Date() : null,
      likes: 0,
      views: 0,
    });

    await project.save();

    const formattedProject = {
      id: project._id.toString(),
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      technologies: project.technologies,
      image: project.image,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      createdDate: project.createdDate.toISOString().split('T')[0],
      completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
      likes: project.likes,
      views: project.views,
    };

    return NextResponse.json({ success: true, data: formattedProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req) {
  await dbConnect();
  try {
    let id, title, description, category, status, technologies, liveUrl, githubUrl, imageFile;
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
    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      ({ id, title, description, category, status, technologies, liveUrl, githubUrl, image: imageFile } = body);
      technologies = technologies || [];
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

    project.title = title || project.title;
    project.description = description || project.description;
    project.category = category || project.category;
    project.status = status || project.status;
    project.technologies = technologies.length ? technologies : project.technologies;
    project.image = imageUrl;
    project.liveUrl = liveUrl || project.liveUrl;
    project.githubUrl = githubUrl || project.githubUrl;
    project.completedDate = status === 'completed' && project.status !== 'completed' ? new Date() : project.completedDate;

    await project.save();

    const formattedProject = {
      id: project._id.toString(),
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      technologies: project.technologies,
      image: project.image,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      createdDate: project.createdDate.toISOString().split('T')[0],
      completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
      likes: project.likes,
      views: project.views,
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

    await Project.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}