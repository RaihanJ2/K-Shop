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

// Middleware

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
  session({
    name: "k-shop-session",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI!,
      collectionName: "sessions",
      ttl: 24 * 60 * 60,
    }),
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
      domain: process.env.CLIENT_URL,
    },
  })
);

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
