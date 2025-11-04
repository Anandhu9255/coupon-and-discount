"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getProducts = async (req, res, next) => {
    try {
        const products = await Product_1.default.find();
        res.json({ success: true, data: products });
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res, next) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        res.json({ success: true, data: product });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res, next) => {
    try {
        const { name, price, description, category, stock } = req.body;
        const newProduct = new Product_1.default({
            name,
            price,
            description,
            category,
            stock
        });
        const savedProduct = await newProduct.save();
        res.status(201).json({ success: true, message: 'Product created successfully', data: savedProduct });
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
//# sourceMappingURL=productController.js.map