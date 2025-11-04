"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const validateRequest_1 = require("../middleware/validateRequest");
const auth_1 = require("../middleware/auth");
const schemas_1 = require("../schemas");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticate, auth_1.requireAdmin, (0, validateRequest_1.validateRequest)(schemas_1.createProductSchema), productController_1.createProduct);
router.get('/', productController_1.getProducts);
router.get('/:id', productController_1.getProductById);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map