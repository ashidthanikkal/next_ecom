"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const Products_1 = __importDefault(require("../models/Products"));
const mongoose_1 = require("mongoose");
// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, images } = req.body;
        const newProduct = new Products_1.default({
            name,
            description,
            price,
            category,
            stock,
            images,
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.createProduct = createProduct;
// Get all products with optional filtering, sorting, and pagination
const getProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sortBy, order, page, limit } = req.query;
        const filter = {};
        if (category)
            filter.category = category;
        if (minPrice)
            filter.price = { ...filter.price, $gte: Number(minPrice) };
        if (maxPrice)
            filter.price = { ...filter.price, $lte: Number(maxPrice) };
        const sort = {};
        if (sortBy)
            sort[sortBy] = order === "desc" ? -1 : 1;
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const products = await Products_1.default.find(filter)
            .sort(sort)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);
        const total = await Products_1.default.countDocuments(filter);
        res
            .status(200)
            .json({
            products,
            total,
            page: pageNumber,
            pages: Math.ceil(total / pageSize),
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getProducts = getProducts;
// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            res.status(400).json({ msg: "Invalid product ID" });
            return;
        }
        const product = await Products_1.default.findById(id);
        if (!product) {
            res.status(404).json({ msg: "Product not found" });
            return;
        }
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getProductById = getProductById;
// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            res.status(400).json({ msg: "Invalid product ID" });
            return;
        }
        const updatedProduct = await Products_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ msg: "Product not found" });
            return;
        }
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateProduct = updateProduct;
// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            res.status(400).json({ msg: "Invalid product ID" });
            return;
        }
        const deletedProduct = await Products_1.default.findByIdAndDelete(id);
        if (!deletedProduct) {
            res.status(404).json({ msg: "Product not found" });
            return;
        }
        res.status(200).json({ msg: "Product deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteProduct = deleteProduct;
