import { Request, Response } from "express";
import User, { IUser } from "../models/User";
const crypto = require("crypto");

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

//for admin,seller and customer


export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ msg: "Unauthorized" });
      return;
    }
    const userId = req.user.id;
    const user: IUser | null = await User.findById(userId).select("-password -refreshTokens");
    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ msg: "Unauthorized" });
      return;
    }

    const userId = req.user.id;
    const { username, phone } = req.body;

    const user: IUser | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    if (username) user.username = username;
    if (phone) user.phone = phone;

    await user.save();
    res.json({ msg: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};


export const approveSeller = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const seller = await User.findById(id);
    if (!seller || seller.role !== "seller") {
      return res.status(404).json({ msg: "Seller not found" });
    }
    seller.sellerApproved = true;
    await seller.save();
    res.json({ msg: "Seller approved successfully" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const disapproveSeller = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const seller = await User.findById(id);
    if (!seller || seller.role !== "seller") {
      return res.status(404).json({ msg: "Seller not found" });
    }
    seller.sellerApproved = false;
    await seller.save();
    res.json({ msg: "Seller disapproved successfully" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};


//for admin

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract pagination and search parameters from body
    const { limit = 12, skip = 0, searchingText = "" } = req.body;

    // Convert to numbers (in case they come as strings)
    const limitNumber = Number(limit);
    const skipNumber = Number(skip);

    // Optional search filter (by username or email for example)
    const filter =
      searchingText.trim() !== ""
        ? {
            $or: [
              { username: { $regex: searchingText, $options: "i" } },
              { email: { $regex: searchingText, $options: "i" } },
            ],
          }
        : {};

    // Get total count for pagination info
    const totalUsers = await User.countDocuments(filter);

    // Fetch paginated users (excluding sensitive fields)
    const users: IUser[] = await User.find(filter)
      .select("-password -refreshTokens")
      .skip(skipNumber)
      .limit(limitNumber)
      .sort({ createdAt: -1 }); // latest users first

    res.json({
      users,
      // pagination: {
      //   total: totalUsers,
      //   skip: skipNumber,
      //   limit: limitNumber,
      //   totalPages: Math.ceil(totalUsers / limitNumber),
      // },
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};



