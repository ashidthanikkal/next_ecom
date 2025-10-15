import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import auth from "./middleware/authMiddleware";
import { setupSwagger } from "./config/swagger";
import Products from "./routes/productRoutes";
import Users from "./routes/userRoutes";
dotenv.config();

const app = express();

// setup swagger
setupSwagger(app);

// middleware
app.use(express.json());

const allowedOrigin = 'http://localhost:3000';

app.use(cors({
  origin: allowedOrigin,
  credentials: true, // <-- allow cookies/auth headers
}));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", Products);
app.use("/api/users", Users);






// example protected route
app.get("/api/protected", auth, (req, res) => {
  res.json({ msg: "This is protected data" });
});

// start
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
