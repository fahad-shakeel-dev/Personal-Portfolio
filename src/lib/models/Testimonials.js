// // testimonials.model.js (Mongoose example)
// import mongoose from "mongoose";

// const testimonialSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // Links to your User DB (if available)
//     required: false,
//   },
//   name: {
//     type: String,
//     required: function () {
//       return !this.userId; // Require name only if no userId
//     },
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: function () {
//       return !this.userId; // Require email only if no userId
//     },
//     lowercase: true,
//     trim: true,
//   },
//   role: {
//     type: String,
//     default: "Customer",
//     trim: true,
//   },
//   company: {
//     type: String,
//     trim: true,
//   },
//   quote: {
//     type: String,
//     required: true,
//     minlength: 10,
//     maxlength: 1000,
//     trim: true,
//   },
//   avatar: {
//     type: String,
//     default: "", // could generate from gravatar based on email
//   },
//   rating: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 5,
//   },
//   featured: {
//     type: Boolean,
//     default: false, // Admin can "feature" a testimonial
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.models.Testimonial ||
//   mongoose.model("Testimonial", testimonialSchema);


// import mongoose from "mongoose";

// const testimonialSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: false,
//     index: { unique: true, sparse: true }, // Enforce one testimonial per user
//   },
//   name: {
//     type: String,
//     required: function () {
//       return !this.userId; // Require name only if no userId
//     },
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: function () {
//       return !this.userId; // Require email only if no userId
//     },
//     lowercase: true,
//     trim: true,
//   },
//   role: {
//     type: String,
//     default: "Customer",
//     trim: true,
//   },
//   company: {
//     type: String,
//     trim: true,
//   },
//   quote: {
//     type: String,
//     required: true,
//     minlength: 10,
//     maxlength: 1000,
//     trim: true,
//   },
//   avatar: {
//     type: String,
//     default: "", // Could generate from Gravatar based on email
//   },
//   rating: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 5,
//   },
//    status: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending",
//     },
//   featured: {
//     type: Boolean,
//     default: false, 
//   },
//       displayOnPortfolio: {
//       type: Boolean,
//       default: false,
//     },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// }, {
//   timestamps: true, // Adds createdAt and updatedAt
// });

// export default mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);




import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    index: { unique: true, sparse: true }, // Enforce one testimonial per user
  },
  name: {
    type: String,
    required: function () {
      return !this.userId; // Require name only if no userId
    },
    trim: true,
  },
  email: {
    type: String,
    required: function () {
      return !this.userId; // Require email only if no userId
    },
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    default: "Customer",
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  quote: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
    trim: true,
  },
  avatar: {
    type: String,
    default: "", // Could generate from Gravatar based on email
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  displayOnPortfolio: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    default: "web-development",
  },
  projectType: {
    type: String,
    trim: true,
  },
  projectUrl: {
    type: String,
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  approvedDate: {
    type: Date,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

export default mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);