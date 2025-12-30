# 🛒 FreshFetch

A modern, full-stack e-commerce platform for fresh groceries and produce, built with the MERN stack (MongoDB, Express, React, Node.js). FreshFetch provides a seamless shopping experience for customers and a comprehensive management dashboard for sellers.

## ✨ Features

### Customer Features

- 🏠 **Home Page** - Browse featured products and categories
- 🔍 **Product Browsing** - View all products or filter by category
- 📦 **Product Details** - Detailed product information with images
- 🛒 **Shopping Cart** - Add, update, and remove items from cart
- 💳 **Secure Checkout** - Integrated Stripe payment gateway with COD option
- 📍 **Address Management** - Save and manage multiple delivery addresses
- 📋 **Order Tracking** - View order history and status
- 🔐 **User Authentication** - Secure login and registration with JWT

### Seller Features

- 🔑 **Seller Dashboard** - Dedicated admin panel for sellers
- ➕ **Product Management** - Add, edit, and delete products
- 📊 **Product List** - View and manage all listed products
- 📦 **Order Management** - Track and manage customer orders
- 🖼️ **Image Upload** - Cloudinary integration for product images

## 🛠️ Tech Stack

### Frontend

- **React** 19.2.0 - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **TailwindCSS** 4.1.18 - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications

### Backend

- **Node.js** - Runtime environment
- **Express** 5.2.1 - Web framework
- **MongoDB** with **Mongoose** 9.0.2 - Database and ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stripe** 20.1.0 - Payment processing
- **Cloudinary** - Image storage and management
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling

## 📁 Project Structure

```
FreshFetch/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images and media files
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # React Context API (AppContext)
│   │   ├── pages/         # Page components
│   │   │   ├── seller/    # Seller dashboard pages
│   │   │   ├── Home.jsx
│   │   │   ├── AllProducts.jsx
│   │   │   ├── ProductCategory.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── AddAddress.jsx
│   │   │   └── MyOrders.jsx
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend Node.js application
│   ├── configs/           # Configuration files
│   │   ├── db.js          # MongoDB connection
│   │   └── cloudinary.js  # Cloudinary setup
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Address.js
│   ├── routes/            # API routes
│   │   ├── userRoute.js
│   │   ├── sellerRoute.js
│   │   ├── productRoute.js
│   │   ├── cartRoute.js
│   │   ├── addressRoute.js
│   │   └── orderRoute.js
│   ├── .env.example       # Environment variables template
│   ├── package.json
│   └── server.js          # Entry point
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary** account (for image storage)
- **Stripe** account (for payment processing)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/laddasiddharth/FreshFetch.git
   cd FreshFetch
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

1. **Server Environment Variables**

   Create a `.env` file in the `server` directory based on `.env.example`:

   ```env
   # JWT Configuration
   JWT_SECRET=your-jwt-secret-here
   NODE_ENV=development

   # Admin Credentials
   SELLER_EMAIL=admin@example.com
   SELLER_PASSWORD=your-password-here

   # MongoDB
   MONGODB_URI=your-mongodb-connection-string

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Stripe
   STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_WEBHOOK_SECRET=your-webhook-secret
   ```

2. **Client Environment Variables**

   Create a `.env` file in the `client` directory:

   ```env
   VITE_BACKEND_URL=http://localhost:4000
   VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd server
   npm run server    # Development mode with nodemon
   # or
   npm start         # Production mode
   ```

   Server will run on `http://localhost:4000`

2. **Start the frontend development server**

   ```bash
   cd client
   npm run dev
   ```

   Client will run on `http://localhost:5173`

3. **Access the application**
   - Customer Portal: `http://localhost:5173`
   - Seller Dashboard: `http://localhost:5173/seller`

## 📡 API Endpoints

### User Routes (`/api/user`)

- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /profile` - Get user profile

### Seller Routes (`/api/seller`)

- `POST /login` - Seller login
- `POST /logout` - Seller logout

### Product Routes (`/api/product`)

- `GET /` - Get all products
- `GET /:id` - Get product by ID
- `GET /category/:category` - Get products by category
- `POST /add` - Add new product (seller only)
- `PUT /:id` - Update product (seller only)
- `DELETE /:id` - Delete product (seller only)

### Cart Routes (`/api/cart`)

- `GET /` - Get user cart
- `POST /add` - Add item to cart
- `PUT /update` - Update cart item
- `DELETE /remove` - Remove item from cart

### Address Routes (`/api/address`)

- `GET /` - Get user addresses
- `POST /add` - Add new address
- `PUT /:id` - Update address
- `DELETE /:id` - Delete address

### Order Routes (`/api/order`)

- `GET /` - Get user orders
- `POST /create` - Create new order
- `GET /seller` - Get all orders (seller only)
- `PUT /:id/status` - Update order status (seller only)

### Webhook Routes

- `POST /stripe` - Stripe webhook for payment confirmation

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **CORS Protection** - Configured allowed origins
- **Environment Variables** - Sensitive data stored in .env files
- **Cookie Security** - HTTP-only cookies for auth tokens
- **Input Validation** - Server-side validation for all inputs

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach with TailwindCSS
- **Toast Notifications** - Real-time feedback for user actions
- **Loading States** - Smooth loading indicators
- **Error Handling** - User-friendly error messages
- **Clean Navigation** - Intuitive routing and navigation

## 🌐 Deployment

### Frontend (Vercel)

The client is configured for deployment on Vercel:

- Allowed origins include: `https://freshfetch-ten.vercel.app` and `https://fresh-fetch.vercel.app`

### Backend

The server can be deployed on platforms like:

- Heroku
- Railway
- Render
- DigitalOcean

**Important**: Update the `allowedOrigins` array in `server/server.js` with your production frontend URL.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [ISC License](LICENSE).

## 👨‍💻 Author

**Siddharth Ladda**

- GitHub: [@laddasiddharth](https://github.com/laddasiddharth)

## 🙏 Acknowledgments

- React team for the amazing library
- TailwindCSS for the utility-first CSS framework
- Stripe for payment processing
- Cloudinary for image management
- MongoDB for the database solution

## 📧 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

**Happy Shopping! 🛍️**
