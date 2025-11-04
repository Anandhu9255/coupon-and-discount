import { z } from 'zod';
export declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    price: z.ZodNumber;
    description: z.ZodString;
    category: z.ZodString;
    stock: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
}, {
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
}>;
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
//# sourceMappingURL=index.d.ts.map