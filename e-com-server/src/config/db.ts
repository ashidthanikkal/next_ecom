import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 10000, // 10 seconds
    });
    console.log("MongoDB connected successfully 🚀");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
