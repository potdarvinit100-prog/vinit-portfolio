require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/health', require('./routes/health'));
app.use('/api/chat', require('./routes/chat'));

// 404 for anything else
app.use((req, res) => res.status(404).json({ ok: false, message: 'Not found' }));

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection failed:', err.message));
} else {
  console.log('MONGODB_URI not set — running without a database (inquiries will be logged in memory only)');
}

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

module.exports = app;
