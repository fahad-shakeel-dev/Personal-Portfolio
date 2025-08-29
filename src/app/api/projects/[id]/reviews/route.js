// import { dbConnect } from "@/lib/dbCon";
// import Review from "@/lib/models/Review";
// import Like from "@/lib/models/Like";

// export async function GET(request, context) {
//   await dbConnect();
//   const { params } = await context;
//   const reviews = await Review.find({ projectId: params.id }).lean();
//   for (let review of reviews) {
//     review.likesCount = await Like.countDocuments({ targetType: 'review', targetId: review._id });
//   }
//   return new Response(JSON.stringify({ success: true, data: reviews }), { status: 200 });
// }

// export async function POST(request, context) {
//   await dbConnect();
//   const { params } = await context;
//   const { userId, name, comment, rating } = await request.json();
//   const existingReview = await Review.findOne({ userId, projectId: params.id });
//   if (existingReview) {
//     return new Response(JSON.stringify({ success: false, error: "One review per user" }), { status: 400 });
//   }
//   const review = new Review({ projectId: params.id, userId, name, comment, rating, date: new Date() });
//   await review.save();
//   return new Response(JSON.stringify({ success: true, data: review }), { status: 201 });
// }

// src/app/api/projects/[id]/reviews/route.js
// import { dbConnect } from "@/lib/dbCon"
// import Review from "@/lib/models/Review"
// import { NextResponse } from "next/server"

// export async function POST(request, { params }) {
//   await dbConnect()
//   try {
//     const { userId, name, comment, rating } = await request.json()
//     if (!userId || !name || !comment || !rating) {
//       return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
//     }

//     // Check if user already has a review for this project
//     const existingReview = await Review.findOne({ projectId: params.id, userId })
//     if (existingReview) {
//       return NextResponse.json({ success: false, error: "One review per user" }, { status: 400 })
//     }

//     const review = new Review({
//       projectId: params.id,
//       userId,
//       name,
//       comment,
//       rating,
//       date: new Date().toISOString().split("T")[0],
//     })

//     await review.save()
//     return NextResponse.json({ success: true, data: { id: review._id.toString(), projectId: review.projectId, userId: review.userId, name: review.name, comment: review.comment, rating: review.rating, date: review.date } }, { status: 200 })
//   } catch (error) {
//     console.error("Error creating review:", error)
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 })
//   }
// }

// export async function GET(request, { params }) {
//   await dbConnect()
//   try {
//     const reviews = await Review.find({ projectId: params.id }).lean()
//     const formattedReviews = reviews.map(review => ({
//       id: review._id.toString(),
//       projectId: review.projectId.toString(),
//       userId: review.userId,
//       name: review.name,
//       comment: review.comment,
//       rating: review.rating,
//       date: review.date,
//       adminReply: review.adminReply,
//       likesCount: review.likesCount || 0,
//     }))
//     return NextResponse.json({ success: true, data: formattedReviews }, { status: 200 })
//   } catch (error) {
//     console.error("Error fetching reviews:", error)
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 })
//   }
// }




// src/app/api/projects/[id]/reviews/route.js
import { dbConnect } from "@/lib/dbCon"
import Review from "@/lib/models/Review"
import Like from "@/lib/models/Like"
import { NextResponse } from "next/server"

export async function POST(request, { params }) {
  await dbConnect()
  try {
    const { userId, name, comment, rating } = await request.json()
    if (!userId || !name || !comment || !rating) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already has a review for this project
    const existingReview = await Review.findOne({ projectId: params.id, userId })
    if (existingReview) {
      return NextResponse.json({ success: false, error: "One review per user" }, { status: 400 })
    }

    const review = new Review({
      projectId: params.id,
      userId,
      name,
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
  await dbConnect()
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    const reviews = await Review.find({ projectId: params.id }).lean()
    let userLikes = []
    if (userId) {
      userLikes = await Like.find({ userId, targetType: "review", targetId: { $in: reviews.map(r => r._id) } }).lean()
    }

    const formattedReviews = reviews.map(review => ({
      id: review._id.toString(),
      projectId: review.projectId.toString(),
      userId: review.userId,
      name: review.name,
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
