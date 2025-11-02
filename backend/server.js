const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const recipeRoutes = require('./routes/recipes');
const userRoutes = require('./routes/users');
const ocrRoutes = require('./routes/ocr');
const feedRoutes = require('./routes/feed');

// Use routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ocr', ocrRoutes);
app.use('/api/feed', feedRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🔥 Sizzle API is running!',
    version: '1.0.0',
    endpoints: {
      recipes: '/api/recipes',
      users: '/api/users',
      ocr: '/api/ocr',
      feed: '/api/feed',
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔥 Sizzle server is running on http://localhost:${PORT}`);
  console.log(`📱 Ready to serve delicious data!`);
});
