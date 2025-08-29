import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  },
  targetType: {
    type: String,
    enum: ['project', 'review'],
    required: [true, 'Target type is required'],
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Target ID is required'],
  },
}, { timestamps: true });

// Prevent model overwrite
const Like = mongoose.models.Like || mongoose.model('Like', likeSchema);

export default Like;