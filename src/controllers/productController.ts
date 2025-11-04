import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, price, description, category, stock } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, message: 'Product created successfully', data: savedProduct });
  } catch (error) {
    next(error);
  }
};
