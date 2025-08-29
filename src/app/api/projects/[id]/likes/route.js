import { dbConnect } from "@/lib/dbCon";
import Like from "@/lib/models/Like";

export async function POST(request, context) {
  await dbConnect();
  const { params } = await context;
  const { userId } = await request.json();
  const existingLike = await Like.findOne({ userId, targetType: 'project', targetId: params.id });
  if (existingLike) {
    return new Response(JSON.stringify({ success: false, error: "Already liked" }), { status: 400 });
  }
  const like = new Like({ userId, targetType: 'project', targetId: params.id });
  await like.save();
  const likesCount = await Like.countDocuments({ targetType: 'project', targetId: params.id });
  return new Response(JSON.stringify({ success: true, data: { likes: likesCount } }), { status: 201 });
}

export async function DELETE(request, context) {
  await dbConnect();
  const { params } = await context;
  const { userId } = await request.json();
  await Like.deleteOne({ userId, targetType: 'project', targetId: params.id });
  const likesCount = await Like.countDocuments({ targetType: 'project', targetId: params.id });
  return new Response(JSON.stringify({ success: true, data: { likes: likesCount } }), { status: 200 });
}