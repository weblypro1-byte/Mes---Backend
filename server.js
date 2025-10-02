





const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://modernenterprisessolutions.vercel.app',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/footer', require('./routes/footer'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/partner', require('./routes/partner'));
app.use('/api/product', require('./routes/product'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is running successfully',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📍 Health check: http://localhost:${port}/api/health`);
    console.log(`📧 Form endpoints:`);
    console.log(`   - Newsletter: http://localhost:${port}/api/footer/newsletter`);
    console.log(`   - Contact: http://localhost:${port}/api/contact`);
    console.log(`   - Partner: http://localhost:${port}/api/partner`);
    console.log(`   - Product: http://localhost:${port}/api/product`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

// Start with port from .env or 5000, will auto-increment if busy
const PORT = process.env.PORT || 5000;
startServer(PORT);

module.exports = app;