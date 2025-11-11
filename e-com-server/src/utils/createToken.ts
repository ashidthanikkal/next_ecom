import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import { Response } from "express";

const createToken = (res: Response, user: IUser) => {
  const token= jwt.sign(
    { id: user._id, role: user.role }, // include role here
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" } // short-lived
  );

  res.cookie('token',token,{
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export default createToken;