import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const crypto = require("crypto");


// export const generateAccessToken = (userId: string): string => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
//     expiresIn: "15m", // short-lived
//   });
// };

export const generateAccessToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, role: user.role }, // include role here
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" } // short-lived
  );
};


export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d", // long-lived
  });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username, role } = req.body;

    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role === "seller" ? "seller" : "customer", // force to either seller/customer
      sellerApproved: role === "seller" ? false : undefined, // pending approval
      refreshTokens: [],
    });
    await newUser.save();

    if (role === "seller") {
      res
        .status(201)
        .json({ msg: "Seller registered. Awaiting admin approval." });
    } else {
      res.status(201).json({ msg: "Customer registered successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};




export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: "Invalid credentials" });
      return;
    }

      // 🚫 Block seller login if not approved by admin
    if (user.role === "seller" && !user.sellerApproved) {
      res.status(403).json({ msg: "Seller account not approved by admin" });
      return;
    }


    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id.toString());

    // Save refresh token in DB
    user.refreshTokens.push(refreshToken);
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;
  if (!token) {
    res.status(401).json({ msg: "No refresh token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    ) as { id: string };

    const user = await User.findById(decoded.id);
    if (!user || !user.refreshTokens.includes(token)) {
      res.status(403).json({ msg: "Invalid refresh token" });
      return;
    }

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ msg: "Invalid or expired refresh token" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;
  if (!token) {
    res.status(400).json({ msg: "No refresh token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    ) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(400).json({ msg: "User not found" });
      return;
    }

    // Remove refresh token from DB
    user.refreshTokens = user.refreshTokens.filter((rt) => rt !== token);
    await user.save();

    res.json({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};

// Temporary OTP store (use Redis in production!)
const otpStore = new Map<
  string,
  { email: string; otp: string; expiresAt: number; verified?: boolean }
>();

// generate OTP and send email
export const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const otpId = crypto.randomBytes(12).toString("hex");
  // generate unique otpId
  const expiresAt = Date.now() + 10 * 60 * 1000; // valid for 10 mins

  // store OTP in memory with otpId
  otpStore.set(otpId, { email: user.email, otp, expiresAt });

  // send email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    to: user.email,
    subject: "🔒 Password Reset OTP",
    html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.1);">
    <!-- Header -->
  <div style="background: linear-gradient(135deg, #4CAF50, #2E7D32); color: white; padding: 25px; text-align: center;">
    <h2 style="margin: 0; font-size: 24px;">🔒 Password Reset Request</h2>
  </div>

  <!-- Body -->
  <div style="padding: 30px; text-align: center;">
    <p style="font-size: 16px; margin-bottom: 10px;">Hi <strong>${
      user.email
    }</strong>,</p>
    <p style="font-size: 15px; color: #444;">You requested to reset your password. Use the OTP below to continue:</p>

    <!-- OTP -->
    <div style="margin: 25px 0;">
      <h1 style="background: #f9f9f9; display: inline-block; padding: 18px 40px; border-radius: 12px; letter-spacing: 6px; font-size: 34px; margin: 0; border: 2px dashed #4CAF50; color: #2E7D32;">
        ${otp}
      </h1>
    </div>

    <p style="color: #888; font-size: 14px;">⏳ This OTP is valid for <strong>10 minutes</strong>.</p>
    <p style="color: #888; font-size: 14px;">If you didn’t request this, please ignore this email.</p>
  </div>

  <!-- Footer -->
  <div style="background-color: #f5f5f5; padding: 15px; text-align: center; color: #555; font-size: 13px;">
    &copy; ${new Date().getFullYear()} <strong>Your Company</strong>. All rights reserved.
  </div>
</div>`,
  });

  res.json({ message: "OTP sent to email", otpId }); // return otpId instead of otpToken
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp, otpId } = req.body;

  const stored = otpStore.get(otpId);
  if (!stored) {
    return res.status(400).json({ error: "Invalid or expired OTP ID" });
  }

  // Check if expired
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(otpId);
    return res.status(400).json({ error: "OTP expired" });
  }

  // Check email and otp
  if (stored.email !== email || stored.otp !== otp) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  // Mark OTP as verified
  stored.verified = true;
  otpStore.set(otpId, stored);

  // Fetch user ID from database
  const user = await User.findOne({ email }).select("_id");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    message: "OTP verified. You can now reset your password.",
    userId: user._id, // return user id
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    return res
      .status(400)
      .json({ error: "userId and newPassword are required" });
  }

  // Find user by ID
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  // Hash and update password
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password changed successfully" });
};

