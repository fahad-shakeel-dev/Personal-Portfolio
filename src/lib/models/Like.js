import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    targetType: { type: String, enum: ["project","review"], required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

LikeSchema.index({ userId: 1, targetId: 1, targetType: 1 }, { unique: true });

export default mongoose.models.Like || mongoose.model("Like", LikeSchema);
