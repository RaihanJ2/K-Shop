import { Request, Response, NextFunction } from "express";
import passport from "passport";
import User from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res.status(400).json({
        message: "User with this email or username already exists",
      });
      return;
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      provider: "local",
    });

    await user.save();

    // Log in the user after registration
    req.login({ ...user.toObject(), _id: user._id.toString() }, (err) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error logging in after registration" });
        return;
      }

      const userResponse = {
        _id: user._id,
        username: user.username,
        email: user.email,
        provider: user.provider,
      };

      res.status(201).json({
        message: "User registered successfully",
        user: userResponse,
      });
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) {
      next(err);
      return;
    }

    if (!user) {
      res.status(401).json({ message: info?.message || "Login failed" });
      return;
    }

    req.login(user, (err) => {
      if (err) {
        next(err);
        return;
      }

      const userResponse = {
        _id: user._id,
        username: user.username,
        email: user.email,
        provider: user.provider,
      };

      res.json({
        message: "Login successful",
        user: userResponse,
      });
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response): void => {
  req.logout((err) => {
    if (err) {
      res.status(500).json({ message: "Error logging out" });
      return;
    }

    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Error destroying session" });
        return;
      }

      res.clearCookie("k-shop-session");
      res.json({ message: "Logout successful" });
    });
  });
};

export const getCurrentUser = (req: Request, res: Response): void => {
  if (req.user) {
    const user = {
      _id: (req.user as any)._id,
      username: (req.user as any).username,
      email: (req.user as any).email,
      provider: (req.user as any).provider,
    };
    res.json({ user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};

// Auth0 Routes
export const auth0Login = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate("auth0", {
    scope: "openid email profile",
  })(req, res, next);
};

export const auth0Callback = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate("auth0", (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return next();
    });
  })(req, res, next);
};
