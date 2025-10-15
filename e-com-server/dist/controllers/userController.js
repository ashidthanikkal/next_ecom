"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disapproveSeller = exports.approveSeller = exports.getSellers = exports.updateProfile = exports.getProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const crypto = require("crypto");
//for admin,seller and customer
const getProfile = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ msg: "Unauthorized" });
            return;
        }
        const userId = req.user.id;
        const user = await User_1.default.findById(userId).select("-password -refreshTokens");
        if (!user) {
            res.status(404).json({ msg: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ msg: "Unauthorized" });
            return;
        }
        const userId = req.user.id;
        const { username, phone } = req.body;
        const user = await User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ msg: "User not found" });
            return;
        }
        if (username)
            user.username = username;
        if (phone)
            user.phone = phone;
        await user.save();
        res.json({ msg: "Profile updated", user });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateProfile = updateProfile;
//for admin
const getSellers = async (req, res) => {
    try {
        const sellers = await User_1.default.find({ role: "seller" }).select("-password -refreshTokens");
        res.json(sellers);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getSellers = getSellers;
const approveSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const seller = await User_1.default.findById(id);
        if (!seller || seller.role !== "seller") {
            return res.status(404).json({ msg: "Seller not found" });
        }
        seller.sellerApproved = true;
        await seller.save();
        res.json({ msg: "Seller approved successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.approveSeller = approveSeller;
const disapproveSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const seller = await User_1.default.findById(id);
        if (!seller || seller.role !== "seller") {
            return res.status(404).json({ msg: "Seller not found" });
        }
        seller.sellerApproved = false;
        await seller.save();
        res.json({ msg: "Seller disapproved successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.disapproveSeller = disapproveSeller;
