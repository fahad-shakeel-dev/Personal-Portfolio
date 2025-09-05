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
               likesThisWeek: {
                 $sum: {
                   $cond: [{ $gte: ['$createdAt', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)] }, 1, 0]
                 }
               },
               likesThisMonth: {
                 $sum: {
                   $cond: [{ $gte: ['$createdAt', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)] }, 1, 0]
                 }
               },
               recentLikes: {
                 $sum: {
                   $cond: [{ $gte: ['$createdAt', new Date(Date.now() - 24 * 60 * 60 * 1000)] }, 1, 0]
                 }
               },
             }
           },
           {
             $lookup: {
               from: 'projects',
               localField: '_id',
               foreignField: '_id',
               as: 'project'
             }
           },
           { $unwind: '$project' },
           {
             $project: {
               projectId: '$_id',
               projectTitle: '$project.title',
               totalLikes: 1,
               likedBy: 1,
               likesThisWeek: 1,
               likesThisMonth: 1,
               recentLikes: 1,
               topLikers: { $slice: ['$likedBy', 5] } // Top 5 likers as example
             }
           }
         ]);

         return NextResponse.json({ success: true, data: likes }, { status: 200 });
       } catch (error) {
         return NextResponse.json({ success: false, error: error.message }, { status: 500 });
       }
     }