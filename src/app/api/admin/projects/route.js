import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbCon';
import Project from '@/lib/models/Projects';
import Like from '@/lib/models/Like';

export async function GET(req) {
  await dbConnect();
  try {
    const projects = await Project.find().lean();
    const projectIds = projects.map(p => p._id);

    const likes = await Like.aggregate([
      { $match: { targetType: 'project', targetId: { $in: projectIds } } },
      {
        $group: {
          _id: '$targetId',
          totalLikes: { $sum: 1 },
          likedBy: { $push: '$userId' },
        }
      }
    ]);

    const likesMap = likes.reduce((map, item) => {
      map[item._id.toString()] = { totalLikes: item.totalLikes, likedBy: item.likedBy };
      return map;
    }, {});

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
      createdDate: project.createdDate.toISOString().split('T')[0],
      completedDate: project.completedDate ? project.completedDate.toISOString().split('T')[0] : null,
      likes: likesMap[project._id.toString()]?.totalLikes || 0,
      views: project.views,
      viewedBy: project.viewedBy || [],
      likedBy: likesMap[project._id.toString()]?.likedBy || [],
    }));

    return NextResponse.json({ success: true, data: formattedProjects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}