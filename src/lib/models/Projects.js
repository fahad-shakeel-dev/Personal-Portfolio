







import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['web-development', 'mobile-development', 'web-design', 'ui-ux'],
    default: 'web-development',
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['planning', 'in-progress', 'completed', 'on-hold'],
    default: 'planning',
  },
  technologies: {
    type: [String],
    required: [true, 'At least one technology is required'],
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: 'At least one technology is required',
    },
  },
  image: {
    type: String,
    default: '/placeholder.svg',
  },
  liveUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+$/, 'Please provide a valid URL'],
    default: '',
  },
  githubUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+$/, 'Please provide a valid URL'],
    default: '',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  completedDate: {
    type: Date,
    default: null,
  },
  likes: {
    type: Number,
    default: 0,
    min: [0, 'Likes cannot be negative'],
  },
  views: {
    type: Number,
    default: 0,
    min: [0, 'Views cannot be negative'],
  },
  viewedBy: {
    type: [String],
    default: [],
  },
  features: {
    type: [String],
    default: [],
    validate: {
      validator: function(arr) {
        return arr.every(feature => typeof feature === 'string' && feature.trim().length > 0);
      },
      message: 'Features must be non-empty strings',
    },
  },
  gallery: {
    type: [String],
    default: ['/placeholder.svg?height=300&width=400'],
    validate: {
      validator: function(arr) {
        return arr.every(url => /^https?:\/\/.+$|^\/.+$/.test(url));
      },
      message: 'Gallery images must be valid URLs or local paths',
    },
  },
  likedBy: {
    type: [String],
    default: [],
  },
});

// Update timestamps on save
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Prevent model overwrite
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
