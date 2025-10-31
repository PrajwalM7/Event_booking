// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookingsRoutes = require('./routes/bookings');

const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Missing MONGODB_URI in environment. Add it to your .env file');
  process.exit(1);
}

// Connect to MongoDB
connectDB(MONGODB_URI);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', bookingsRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '✅ Synergia Bookings API is running smoothly 🚀',
  });
});

// 404 Fallback route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '❌ Route not found',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
