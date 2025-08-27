import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/products";
import cartRoutes from "./routes/carts";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import addressRoutes from "./routes/address";
import paymentRoutes from "./routes/payment";
import historyRoutes from "./routes/history";
import connectDB from "./config/db";
import MongoStore from "connect-mongo";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    user: { _id: string; username: string; email: string };
  }
}

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT!;

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
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
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Important for cross-origin
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Debug middleware to log session info
app.use((req, res, next) => {
  console.log("🍪 Session ID:", req.sessionID);
  console.log("👤 Session User:", req.session?.user);
  console.log("🔧 Session Cookie:", req.headers.cookie);
  next();
});

// routes
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/address", addressRoutes);
app.use("/payment", paymentRoutes);
app.use("/history", historyRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} 🚀`);
});
