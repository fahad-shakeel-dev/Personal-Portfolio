import { dbConnect } from "@/lib/dbCon";
import Project from "@/lib/models/Projects";
import Like from "@/lib/models/Like";

export async function GET(request, context) {
  await dbConnect();
  const { params } = await context;
  const project = await Project.findById(params.id).lean();
  if (!project) {
    return new Response(JSON.stringify({ success: false, error: "Project not found" }), { status: 404 });
  }
  project.likesCount = await Like.countDocuments({ targetType: 'project', targetId: params.id });
  return new Response(JSON.stringify({ success: true, data: project }), { status: 200 });
}