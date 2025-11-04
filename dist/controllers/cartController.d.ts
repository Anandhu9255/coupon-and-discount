import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
export declare const addToCart: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getCart: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const applyCoupon: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=cartController.d.ts.map