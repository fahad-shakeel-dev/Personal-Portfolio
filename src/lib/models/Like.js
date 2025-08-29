// import mongoose from 'mongoose';

// const likeSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     required: [true, 'User ID is required'],
//   },
//   targetType: {
//     type: String,
//     enum: ['project', 'review'],
//     required: [true, 'Target type is required'],
//   },
//   targetId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: [true, 'Target ID is required'],
//   },
// }, { timestamps: true });

// // Prevent model overwrite
// const Like = mongoose.models.Like || mongoose.model('Like', likeSchema);

// export default Like;



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
