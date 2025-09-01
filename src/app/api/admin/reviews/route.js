import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/lib/dbCon';
import Review from '@/lib/models/Review';
import Like from '@/lib/models/Like';

export async function GET(req) {
  await dbConnect();
  try {
    const reviews = await Review.aggregate([
      {
        $lookup: {
          from: 'projects',
          localField: 'projectId',
          foreignField: '_id',
          as: 'project'
        }
      },
      { $unwind: '$project' },
      {
        $lookup: {
          from: 'likes',
          localField: '_id',
          foreignField: 'targetId',
          as: 'likes'
        }
      },
      {
        $addFields: {
          likesCount: { $size: '$likes' },
          likedBy: '$likes.userId'
        }
      },
      { $project: { likes: 0 } } // Remove raw likes array to reduce payload
    ]);

    return NextResponse.json({ success: true, data: reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (!id) return NextResponse.json({ success: false, error: 'Review ID required' }, { status: 400 });

    const review = await Review.findByIdAndDelete(id);
    if (!review) return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });

    // Delete associated likes
    await Like.deleteMany({ targetType: 'review', targetId: id });

    return NextResponse.json({ success: true, message: 'Review deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const { adminReply } = await req.json();

  try {
    if (!id || !adminReply) return NextResponse.json({ success: false, error: 'Review ID and reply required' }, { status: 400 });

    const review = await Review.findByIdAndUpdate(id, { adminReply }, { new: true });
    if (!review) return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: review }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}