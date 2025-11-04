import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
export declare const createCoupon: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getCouponByCode: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=couponController.d.ts.map