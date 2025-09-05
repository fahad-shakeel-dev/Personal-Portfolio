import { dbConnect } from "@/lib/dbCon";
import Like from "@/lib/models/Like";

// ✅ POST handler
export async function POST(request, { params }) {
  await dbConnect();

  const { id } = await params; // ✅ Await dynamic route param
  const { userId } = await request.json();

  const existingLike = await Like.findOne({
    userId,
    targetType: 'project',
    targetId: id,
  });

  if (existingLike) {
    return new Response(
      JSON.stringify({ success: false, error: "Already liked" }),
      { status: 400 }
    );
  }

  const like = new Like({
    userId,
    targetType: 'project',
    targetId: id,
  });

  await like.save();

  const likesCount = await Like.countDocuments({
    targetType: 'project',
    targetId: id,
  });

  return new Response(
    JSON.stringify({ success: true, data: { likes: likesCount } }),
    { status: 201 }
  );
}

// ✅ DELETE handler
export async function DELETE(request, { params }) {
  await dbConnect();

  const { id } = await params; // ✅ Await dynamic route param
  const { userId } = await request.json();

  await Like.deleteOne({
    userId,
    targetType: 'project',
    targetId: id,
  });

  const likesCount = await Like.countDocuments({
    targetType: 'project',
    targetId: id,
  });

  return new Response(
    JSON.stringify({ success: true, data: { likes: likesCount } }),
    { status: 200 }
  );
}
