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

//for admin

export const getSellers = async (req: Request, res: Response) => {
  try {
    const sellers = await User.find({ role: "seller" }).select("-password -refreshTokens");
    res.json(sellers);
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




