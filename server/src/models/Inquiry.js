const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    businessName: { type: String, trim: true, default: '' },
    businessType: { type: String, trim: true, default: '' },
    websiteUrl: { type: String, trim: true, default: '' },
    requirements: { type: String, trim: true, default: '' },
    features: { type: String, trim: true, default: '' },
    budget: { type: String, trim: true, default: '' },
    timeline: { type: String, trim: true, default: '' },
    details: { type: String, trim: true, default: '' },
    source: { type: String, trim: true, default: '' },
    packageName: { type: String, trim: true, default: '' },
    industry: { type: String, trim: true, default: '' },
    meta: {
      ip: { type: String, default: '' },
      userAgent: { type: String, default: '' },
    },
    status: { type: String, default: 'new', enum: ['new', 'contacted', 'closed'] },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// At least one contact method (email or phone) must be present.
inquirySchema.pre('validate', function (next) {
  if (!this.email && !this.phone) {
    this.invalidate('email', 'At least one contact method (email or phone) is required.');
  }
  next();
});

module.exports = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
