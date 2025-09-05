
// src/app/api/reviews/[reviewId]/likes/route.js

import { dbConnect } from "@/lib/dbCon"
import Review from "@/lib/models/Review"
import Like from "@/lib/models/Like"
import { NextResponse } from "next/server"

// ✅ POST handler
export async function POST(request, { params }) {
  const { reviewId } = await params; // ✅ Await params in Next.js 15+
  await dbConnect();

  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID required" },
        { status: 400 }
      );
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return NextResponse.json(
        { success: false, error: "Review not found" },
        { status: 404 }
      );
    }

    const existingLike = await Like.findOne({
      userId,
      targetType: "review",
      targetId: reviewId,
    });

    if (existingLike) {
      return NextResponse.json(
        { success: false, error: "Already liked" },
        { status: 400 }
      );
    }

    const like = new Like({
      userId,
      targetType: "review",
      targetId: reviewId,
    });

    await like.save();

    review.likesCount =
      (await Like.countDocuments({
        targetType: "review",
        targetId: reviewId,
      })) || 0;

    await review.save();

    return NextResponse.json(
      { success: true, data: { likes: review.likesCount } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error liking review:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE handler
export async function DELETE(request, { params }) {
  const { reviewId } = await params; // ✅ Await params in Next.js 15+
  await dbConnect();

  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID required" },
        { status: 400 }
      );
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return NextResponse.json(
        { success: false, error: "Review not found" },
        { status: 404 }
      );
    }

    const like = await Like.findOne({
      userId,
      targetType: "review",
      targetId: reviewId,
    });

    if (!like) {
      return NextResponse.json(
        { success: false, error: "Not liked" },
        { status: 400 }
      );
    }

    await Like.deleteOne({ _id: like._id });

    review.likesCount =
      (await Like.countDocuments({
        targetType: "review",
        targetId: reviewId,
      })) || 0;

    await review.save();

    return NextResponse.json(
      { success: true, data: { likes: review.likesCount } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unliking review:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
