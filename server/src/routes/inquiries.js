const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Inquiry = require('../models/Inquiry');

// In-memory fallback when MongoDB isn't configured: inquiries are logged, not persisted.
const memoryStore = [];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res) => {
  const body = req.body || {};

  // Honeypot: bots fill the hidden "website" field — silently accept without saving.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  const {
    name = '',
    email = '',
    phone = '',
    businessName = '',
    businessType = '',
    websiteUrl = '',
    requirements = '',
    features = '',
    budget = '',
    timeline = '',
    details = '',
    source = '',
    packageName = '',
    industry = '',
  } = body;

  // Manual validation (dependency-free, express-validator-style checks).
  const errors = [];
  if (typeof name !== 'string' || name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name is required (2+ characters).' });
  }
  if (email && !EMAIL_RE.test(String(email).trim())) {
    errors.push({ field: 'email', message: 'Email format is invalid.' });
  }
  if (!requirements.trim() && !details.trim()) {
    errors.push({ field: 'requirements', message: 'Tell us about your project (requirements or details).' });
  }
  if (!email.trim() && !phone.trim()) {
    errors.push({ field: 'email', message: 'At least one contact method (email or phone) is required.' });
  }
  if (errors.length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const doc = {
    name: name.trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    businessName: String(businessName).trim(),
    businessType: String(businessType).trim(),
    websiteUrl: String(websiteUrl).trim(),
    requirements: String(requirements).trim(),
    features: String(features).trim(),
    budget: String(budget).trim(),
    timeline: String(timeline).trim(),
    details: String(details).trim(),
    source: String(source).trim(),
    packageName: String(packageName).trim(),
    industry: String(industry).trim(),
    meta: {
      ip: req.ip || '',
      userAgent: req.get('user-agent') || '',
    },
  };

  try {
    if (mongoose.connection.readyState === 1) {
      const saved = await Inquiry.create(doc);
      return res.status(201).json({ ok: true, id: String(saved._id), persisted: true });
    }
    const id = `mem-${Date.now()}-${memoryStore.length}`;
    memoryStore.push({ id, ...doc, status: 'new', createdAt: new Date() });
    console.warn('MONGODB_URI not set — inquiry logged, not persisted');
    return res.status(201).json({ ok: true, id, persisted: false });
  } catch (err) {
    console.error('Failed to save inquiry:', err.message);
    return res.status(500).json({ ok: false, message: 'Could not save inquiry.' });
  }
});

// Not exposed — intentionally omitted (returns 404). Kept out to avoid leaking leads.
// If a future admin dashboard needs it, add auth and a GET handler here.

module.exports = router;
