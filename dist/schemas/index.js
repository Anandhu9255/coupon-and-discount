"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    price: zod_1.z.number().min(0, 'Price must be non-negative'),
    description: zod_1.z.string().min(1, 'Description is required'),
    category: zod_1.z.string().min(1, 'Category is required'),
    stock: zod_1.z.number().int().min(0, 'Stock must be non-negative integer')
});
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long')
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(1, 'Password is required')
});
//# sourceMappingURL=index.js.map