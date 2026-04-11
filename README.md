BuildMart - Full-Stack Construction Materials Marketplace
BuildMart is a professional B2B/B2C e-commerce platform designed specifically for the construction industry. It allows users to browse building materials by category and location, manage a shopping cart, apply coupons, and process orders. The platform also includes a dedicated Seller Dashboard for inventory management.

Architecture Overview
BuildMart follows a modern decoupled architecture:

Frontend: A React-based Single Page Application (SPA) hosted on Vercel.

Backend: A Node.js and Express REST API hosted on Railway.

Database: MongoDB (Atlas) for flexible, document-based data storage.

Key Features:
User Authentication: Secure Login/Register flows for both buyers and sellers.

Location-Based Browsing: Filter materials based on specific regions (e.g., Jaipur, Mumbai, Delhi).

Smart Cart System: Integrated CartContext for real-time updates and persistence.

Coupon Engine: Apply discount codes during checkout.

Seller Dashboard: Comprehensive interface for sellers to add, update, and manage material listings.

Order Management: Full tracking from cart to order confirmation.

Build-Mart/
├── frontend/               # React SPA
│   ├── public/             # Static assets
│   └── src/
│       ├── api/            # Centralized API client & logic
│       ├── components/     # Reusable UI elements
│       ├── context/        # State management (Cart, Location)
│       └── pages/          # Individual route components
├── backend/                # Express API
│   ├── models/             # Mongoose schemas (User, Material, Order)
│   ├── routes/             # API endpoints
│   └── server.js           # Main entry point & Middleware
└── vercel.json             # Deployment configuration

Website link: https://build-mart-react-app.vercel.app/
