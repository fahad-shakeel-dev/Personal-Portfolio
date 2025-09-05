// src/app/api/reviews/[reviewId]/route.js
import { dbConnect } from "@/lib/dbCon"
import Review from "@/lib/models/Review"
import { NextResponse } from "next/server"

export async function PATCH(request, { params }) {
  await dbConnect()
  try {
    const reviewId = params.reviewId
    if (!reviewId) {
      return NextResponse.json({ success: false, error: "Invalid review ID" }, { status: 400 })
    }

    const { userId, name, title, comment, rating } = await request.json()
    if (!userId || !name || !title || !comment || !rating) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const review = await Review.findById(reviewId)
    if (!review) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 })
    }

    if (review.userId !== userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    // ✅ Update all fields including title
    review.name = name
    review.title = title
    review.comment = comment
    review.rating = rating
    review.date = new Date().toISOString().split("T")[0]

    await review.save()

    return NextResponse.json({
      success: true,
      data: {
        id: review._id.toString(),
        projectId: review.projectId.toString(),
        userId: review.userId,
        name: review.name,
        title: review.title, // ✅ include title in response
        comment: review.comment,
        rating: review.rating,
        date: review.date,
      }
    }, { status: 200 })
  } catch (error) {
    console.error("Error updating review:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  await dbConnect()
  try {
    const reviewId = params.reviewId
    if (!reviewId) {
      return NextResponse.json({ success: false, error: "Invalid review ID" }, { status: 400 })
    }

    const { userId } = await request.json()
    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 })
    }

    const review = await Review.findById(reviewId)
    if (!review) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 })
    }

    if (review.userId !== userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    await Review.deleteOne({ _id: reviewId })
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error deleting review:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
