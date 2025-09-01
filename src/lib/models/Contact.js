const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sentDate: { type: String, required: true },
  sentBy: { type: String, required: true, default: 'Admin' },
}, { _id: true });

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  companyName: { type: String, required: true },
  serviceInterestedIn: { type: String, required: true },
  projectBudget: { type: String, required: true },
  projectDetails: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'in-review', 'approved', 'rejected', 'completed'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  source: { type: String, default: 'website' },
  notes: { type: String, default: '' },
  responses: [responseSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update `updatedAt` on save
contactSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.models.Contact || mongoose.model('Contact', contactSchema);