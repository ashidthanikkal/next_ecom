"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
const swagger_1 = require("./config/swagger");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// setup swagger
(0, swagger_1.setupSwagger)(app);
// middleware
app.use(express_1.default.json());
const allowedOrigin = 'http://localhost:3000';
app.use((0, cors_1.default)({
    origin: allowedOrigin,
    credentials: true, // <-- allow cookies/auth headers
}));
// routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/products", productRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
// example protected route
app.get("/api/protected", authMiddleware_1.default, (req, res) => {
    res.json({ msg: "This is protected data" });
});
// start
const PORT = process.env.PORT || 5000;
(0, db_1.connectDB)().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
