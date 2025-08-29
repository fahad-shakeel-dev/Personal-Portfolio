// import { dbConnect } from "@/lib/dbCon";
// import Project from "@/lib/models/Projects";
// import Like from "@/lib/models/Like";

// export async function GET(request, context) {
//   await dbConnect();
//   const { params } = await context;
//   const project = await Project.findById(params.id).lean();
//   if (!project) {
//     return new Response(JSON.stringify({ success: false, error: "Project not found" }), { status: 404 });
//   }
//   project.likesCount = await Like.countDocuments({ targetType: 'project', targetId: params.id });
//   return new Response(JSON.stringify({ success: true, data: project }), { status: 200 });
// }

// import { dbConnect } from "@/lib/dbCon";
// import Project from "@/lib/models/Projects";
// import Like from "@/lib/models/Like";

// export async function GET(request, context) {
//   await dbConnect();
//   const { params } = context;

//   // get userId from query string
//   const { searchParams } = new URL(request.url);
//   const userId = searchParams.get("userId");

//   const project = await Project.findById(params.id).lean();
//   if (!project) {
//     return new Response(
//       JSON.stringify({ success: false, error: "Project not found" }),
//       { status: 404 }
//     );
//   }

//   // total likes
//   const likesCount = await Like.countDocuments({
//     targetType: "project",
//     targetId: params.id,
//   });

//   // check if current user already liked
//   let userHasLiked = false;
//   if (userId) {
//     const existingLike = await Like.findOne({
//       userId,
//       targetType: "project",
//       targetId: params.id,
//     });
//     userHasLiked = !!existingLike;
//   }

//   return new Response(
//     JSON.stringify({
//       success: true,
//       data: {
//         ...project,
//         likesCount,
//         userHasLiked,
//       },
//     }),
//     { status: 200 }
//   );
// }







import { dbConnect } from "@/lib/dbCon";
import Project from "@/lib/models/Projects";
import Like from "@/lib/models/Like";

// 👇 Note: 'params' is a Promise in Next.js 15+, so we await it
export async function GET(request, { params }) {
  await dbConnect(); // ✅ Connect to MongoDB
  const { id } = await params; // ✅ Awaiting the params object


  // Get userId from query string
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  // Find project by ID
  const project = await Project.findById(id).lean();
  if (!project) {
    return new Response(
      JSON.stringify({ success: false, error: "Project not found" }),
      { status: 404 }
    );
  }

  // Count total likes for the project
  const likesCount = await Like.countDocuments({
    targetType: "project",
    targetId: id,
  });

  // Check if this user has already liked the project
  let userHasLiked = false;
  if (userId) {
    const existingLike = await Like.findOne({
      userId,
      targetType: "project",
      targetId: id,
    });
    userHasLiked = !!existingLike;
  }

  // Return response
  return new Response(
    JSON.stringify({
      success: true,
      data: {
        ...project,
        likesCount,
        userHasLiked,
      },
    }),
    { status: 200 }
  );
}
