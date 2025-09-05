
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project ID is required'],
  },
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
  },
  adminReply: {
    type: String,
    default: '',
    trim: true,
  },
  likesCount: {
    type: Number,
    default: 0,
    min: [0, 'Likes cannot be negative'],
  },
}, { timestamps: true });
// reviewSchema.index({ userId: 1, likesCount:1 }, { unique: true });
// Prevent model overwrite
const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;