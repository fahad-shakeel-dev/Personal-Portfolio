// models/QuickContact.js
import mongoose from "mongoose"

const quickContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/] },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.models.QuickContact ||
  mongoose.model("QuickContact", quickContactSchema)
