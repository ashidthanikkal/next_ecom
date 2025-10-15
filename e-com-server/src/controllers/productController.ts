import { Request, Response } from "express";
import Product, { IProduct } from "../models/Products";
import { Types } from "mongoose";

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, category, stock, images } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
    });
    const savedProduct: IProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Get all products with optional filtering, sorting, and pagination
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category, minPrice, maxPrice, sortBy, order, page, limit } =
      req.query;
    const filter: any = {};
    if (category) filter.category = category;
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    const sort: any = {};
    if (sortBy) sort[sortBy as string] = order === "desc" ? -1 : 1;
    const pageNumber = parseInt(page as string) || 1;
    const pageSize = parseInt(limit as string) || 10;
    const products: IProduct[] = await Product.find(filter)
      .sort(sort)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    const total = await Product.countDocuments(filter);
    res
      .status(200)
      .json({
        products,
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Get a single product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ msg: "Invalid product ID" });
      return;
    }
    const product: IProduct | null = await Product.findById(id);
    if (!product) {
      res.status(404).json({ msg: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Update a product by ID
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ msg: "Invalid product ID" });
      return;
    }
    const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(
      id,
      req.body,

      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json({ msg: "Product not found" });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Delete a product by ID
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ msg: "Invalid product ID" });
      return;
    }
    const deletedProduct: IProduct | null = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.status(404).json({ msg: "Product not found" });
      return;
    }
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
