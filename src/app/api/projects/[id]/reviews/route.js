import { dbConnect } from "@/lib/dbCon"
import Review from "@/lib/models/Review"
import Like from "@/lib/models/Like"
import { NextResponse } from "next/server"

export async function POST(request, { params }) {
  const { id } = await params
  await dbConnect()
  try {
    const { userId, name, title, comment, rating } = await request.json()
    if (!userId || !name || !title || !comment || !rating) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already has a review for this project
    const existingReview = await Review.findOne({ projectId: id, userId })
    if (existingReview) {
      return NextResponse.json({ success: false, error: "One review per user" }, { status: 400 })
    }

    const review = new Review({
      projectId: id,
      userId,
      name,
      title,
      comment,
      rating,
      createdAt: new Date(),
    })

    await review.save()
    return NextResponse.json({
      success: true,
      data: {
        id: review._id.toString(),
        projectId: review.projectId.toString(),
        userId: review.userId,
        name: review.name,
        title: review.title,
        comment: review.comment,
        rating: review.rating,
        createdAt: review.createdAt,
        likesCount: review.likesCount || 0,
        userHasLiked: false,
      }
    }, { status: 200 })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function GET(request, { params }) {
  const { id } = await params
  await dbConnect()
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    const reviews = await Review.find({ projectId: id }).lean()
    let userLikes = []
    if (userId) {
      userLikes = await Like.find({ userId, targetType: "review", targetId: { $in: reviews.map(r => r._id) } }).lean()
    }

    const formattedReviews = reviews.map(review => ({
      id: review._id.toString(),
      projectId: review.projectId.toString(),
      userId: review.userId,
      name: review.name,
      title: review.title,
      comment: review.comment,
      rating: review.rating,
      createdAt: review.createdAt,
      adminReply: review.adminReply,
      likesCount: review.likesCount || 0,
      userHasLiked: userId ? userLikes.some(like => like.targetId.toString() === review._id.toString()) : false,
    }))

    return NextResponse.json({ success: true, data: formattedReviews }, { status: 200 })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}