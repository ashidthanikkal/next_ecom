import { Schema, model, Document, Types } from "mongoose";

export interface IAddress {
  label: string; // Home, Work, etc.
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface ICartItem {
  productId: Types.ObjectId;  // FIX: use ObjectId instead of string
  quantity: number;
}

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  refreshTokens: string[];
  phone?: string;
  role: "customer" | "seller" | "admin";
  sellerApproved: boolean;
  addresses: IAddress[];
  cart: ICartItem[];
  wishlist: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<IAddress>({
  label: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const cartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
});

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshTokens: [{ type: String }],
    phone: { type: String },
    role: { type: String, enum: ["customer", "seller", "admin"], default: "customer" },
    sellerApproved: { type: Boolean, default: false },
    addresses: [addressSchema],
    cart: [cartItemSchema],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
