const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');
const materialRoutes = require('./routes/materials');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const couponRoutes = require('./routes/coupons');
const profileRoutes = require('./routes/profile');
const sellerProfileRoutes = require('./routes/sellerProfile');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/seller', sellerProfileRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
