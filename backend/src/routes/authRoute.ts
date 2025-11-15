import { Router } from "express";

import { isAuthenticated } from "../middleware";
import {
  auth0Callback,
  auth0Login,
  getCurrentUser,
  login,
  logout,
  register,
} from "../controller/authController";

const router = Router();

// Local authentication
router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getCurrentUser);

// Auth0 authentication
router.get("/auth0", auth0Login);
router.get("/auth0/callback", auth0Callback, (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/`);
});

export default router;
