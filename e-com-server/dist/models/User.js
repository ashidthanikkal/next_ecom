"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    label: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
});
const cartItemSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
});
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshTokens: [{ type: String }],
    phone: { type: String },
    role: { type: String, enum: ["customer", "seller", "admin"], default: "customer" },
    sellerApproved: { type: Boolean, default: false },
    addresses: [addressSchema],
    cart: [cartItemSchema],
    wishlist: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Product" }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", userSchema);
