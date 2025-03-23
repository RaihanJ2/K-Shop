import { Request, Response, Router } from "express";
import { isAuthenticated } from "../middleware";
import User from "../models/User";

const router = Router();

// Fetch user data
router.get("/", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const userId = req.session.user?._id;
    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
