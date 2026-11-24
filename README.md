# 🛒 FreshFetch

A modern, full-stack e-commerce platform for fresh groceries and produce, built with the MERN stack (MongoDB, Express, React, Node.js). FreshFetch provides a seamless shopping experience for customers and a comprehensive management dashboard for sellers.

## ✨ Features

### Customer Features

- 🏠 **Home Page** - Browse featured products and categories
- 🔍 **Product Browsing** - View all products or filter by category
- 📦 **Product Details** - Detailed product information with images
- 🛒 **Shopping Cart** - Add, update, and remove items; the cart is saved to your account and synced across devices
- 💳 **Secure Checkout** - Integrated Stripe payment gateway with COD option
- 📍 **Address Management** - Save multiple delivery addresses and pick one at checkout
- 📋 **Order History** - View past orders with payment type, status and date
- 🔐 **User Authentication** - Secure login and registration with JWT

### Seller Features

- 🔑 **Seller Dashboard** - Dedicated admin panel for sellers
- ➕ **Add Products** - Create products with up to 4 images
- 📊 **Product List** - View all products and toggle in-stock / out-of-stock
- 📦 **Order Overview** - See all customer orders, delivery address and payment status
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
│   ├── .env.example       # Client environment template
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend Node.js application
│   ├── configs/           # Configuration files
│   │   ├── db.js          # MongoDB connection
│   │   ├── cloudinary.js  # Cloudinary setup
│   │   └── multer.js      # File upload config
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
├── .github/workflows/     # Scheduled keep-alive workflow
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20.19 or higher (required by Vite 7)
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

   Copy `server/.env.example` to `server/.env` and fill it in:

   ```env
   # JWT Configuration
   JWT_SECRET=your-jwt-secret-here
   NODE_ENV=development

   # Admin Credentials
   SELLER_EMAIL=admin@example.com
   SELLER_PASSWORD=your-password-here

   # MongoDB
   # Base connection string WITHOUT a database name - the app appends "/FreshFetch"
   # e.g. mongodb+srv://user:pass@cluster.mongodb.net  or  mongodb://localhost:27017
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

   Copy `client/.env.example` to `client/.env`:

   ```env
   VITE_BACKEND_URL=http://localhost:4000
   VITE_CURRENCY=$
   ```

3. **Stripe webhook (only needed to test online payments locally)**

   Orders paid online are marked as paid by a Stripe webhook that posts to `POST /stripe`.
   Forward events to your local server with the [Stripe CLI](https://stripe.com/docs/stripe-cli) and copy the printed signing secret into `STRIPE_WEBHOOK_SECRET`:

   ```bash
   stripe listen --forward-to localhost:4000/stripe
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

Responses are JSON in the form `{ success, message, ... }`.
Authentication uses HTTP-only cookies (`token` for users, `sellerToken` for the seller).

### User Routes (`/api/user`)

| Method | Endpoint    | Auth | Description                               |
| ------ | ----------- | ---- | ----------------------------------------- |
| POST   | `/register` | -    | Register a new user and log in            |
| POST   | `/login`    | -    | Log in                                    |
| GET    | `/is-auth`  | User | Get the logged-in user (incl. saved cart) |
| GET    | `/logout`   | -    | Log out                                   |

### Seller Routes (`/api/seller`)

| Method | Endpoint   | Auth   | Description                            |
| ------ | ---------- | ------ | -------------------------------------- |
| POST   | `/login`   | -      | Seller login (credentials from `.env`) |
| GET    | `/is-auth` | Seller | Check seller session                   |
| GET    | `/logout`  | -      | Seller logout                          |

### Product Routes (`/api/product`)

| Method | Endpoint | Auth   | Description                                                     |
| ------ | -------- | ------ | --------------------------------------------------------------- |
| GET    | `/list`  | -      | Get all products                                                |
| GET    | `/id`    | -      | Get one product (`?id=<productId>`)                             |
| POST   | `/add`   | Seller | Add a product (`multipart/form-data`: `productData` + `images`) |
| POST   | `/stock` | Seller | Update stock status (`{ id, inStock }`)                         |

### Cart Routes (`/api/cart`)

| Method | Endpoint  | Auth | Description                     |
| ------ | --------- | ---- | ------------------------------- |
| POST   | `/update` | User | Save the cart (`{ cartItems }`) |

### Address Routes (`/api/address`)

| Method | Endpoint | Auth | Description                    |
| ------ | -------- | ---- | ------------------------------ |
| POST   | `/add`   | User | Add a delivery address         |
| GET    | `/get`   | User | Get the user's saved addresses |

### Order Routes (`/api/order`)

| Method | Endpoint  | Auth   | Description                                          |
| ------ | --------- | ------ | ---------------------------------------------------- |
| POST   | `/cod`    | User   | Place a Cash on Delivery order                       |
| POST   | `/stripe` | User   | Place an online order; returns a Stripe Checkout URL |
| GET    | `/user`   | User   | Get the user's orders                                |
| GET    | `/seller` | Seller | Get all orders                                       |

### Other

- `GET /` - Health check (returns "API is working")
- `POST /stripe` - Stripe webhook; marks online orders as paid and clears the cart

### Pricing

Prices are always calculated on the server from the database (never trusted from the client). A **2% tax** is added to the item total.

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **CORS Protection** - Configured allowed origins
- **Environment Variables** - Sensitive data stored in .env files
- **Cookie Security** - HTTP-only cookies for auth tokens
- **Server-side Pricing** - Order totals are computed from database prices, with quantity and stock validation
- **Protected Routes** - User and seller routes are guarded by auth middleware (seller auth runs before file uploads)

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach with TailwindCSS
- **Toast Notifications** - Real-time feedback for user actions
- **Loading States** - Smooth loading indicators
- **Error Handling** - User-friendly error messages
- **Clean Navigation** - Intuitive routing and navigation

## 🌐 Deployment

### Frontend (Vercel)

Deploy the `client` folder on Vercel (`client/vercel.json` rewrites all routes to `index.html` so deep links like `/cart` and the Stripe return URL work) and set `VITE_BACKEND_URL` and `VITE_CURRENCY` in the project's environment variables.

### Backend

The backend is deployed on Vercel (`freshfetch-backend.vercel.app`); it can also run on Render, Railway, Heroku or DigitalOcean.
Set all variables from `server/.env.example`, with `NODE_ENV=production` (this enables `secure`, `sameSite=none` cookies for cross-site use).

**Important**:

- Add your production frontend URL to the `allowedOrigins` array in `server/server.js` (currently `localhost:5173`, `freshfetch-ten.vercel.app` and `fresh-fetch.vercel.app`).
- In the Stripe dashboard, create a webhook pointing to `https://<your-backend>/stripe` for the `payment_intent.succeeded` and `payment_intent.payment_failed` events, and set its signing secret as `STRIPE_WEBHOOK_SECRET`.

### Keeping the backend awake

Serverless and free hosting tiers can cold-start or sleep when idle. The GitHub Actions workflow
[`.github/workflows/keep-alive.yml`](.github/workflows/keep-alive.yml) pings the API every 10 minutes.
To enable it, add a repository **variable** named `BACKEND_URL` (Settings → Secrets and variables → Actions → Variables) with your backend URL, e.g. `https://freshfetch-backend.vercel.app`.

## 🧪 Linting & Build

```bash
cd client
npm run lint     # ESLint
npm run build    # Production build to client/dist
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👨‍💻 Author

**Siddharth Ladda**

- GitHub: [@laddasiddharth](https://github.com/laddasiddharth)


---

**Happy Shopping! 🛍️**
