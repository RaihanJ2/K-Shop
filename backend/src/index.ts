import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoute";
import cartRoutes from "./routes/cartRoute";
import authRoutes from "./routes/authRoute";
import addressRoutes from "./routes/addressRoute";
import paymentRoutes from "./routes/paymentRoute";
import historyRoutes from "./routes/historyRoute";
import connectDB from "./config/db";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "./config/passport"; // Import passport configuration

declare module "express-session" {
  interface SessionData {
    user: { _id: string; username: string; email: string };
  }
}

// Extend Express User type
declare global {
  namespace Express {
    interface User {
      _id: string;
      username: string;
      email: string;
      provider: string;
    }
  }
}

dotenv.config();
connectDB();
const app = express();

const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

// Body parser
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Session configuration
app.use(
  session({
    name: "k-shop-session",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI!,
      collectionName: "sessions",
      ttl: 24 * 60 * 60, // 24 hours
    }),
    cookie: {
      secure: isProduction,
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    session: !!req.session,
    authenticated: req.isAuthenticated ? req.isAuthenticated() : false,
  });
});

// Routes
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/auth", authRoutes);
app.use("/address", addressRoutes);
app.use("/payment", paymentRoutes);
app.use("/history", historyRoutes);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} 🚀`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Client URL: ${process.env.CLIENT_URL}`);
  console.log(`Auth0 Enabled: ${!!process.env.AUTH0_DOMAIN}`);
});
