import { Router } from "express";
import { roles, userTypes } from "../utils/constants.js";
import { createProduct, getProductbyId, getAllProducts, reportFaultProduct } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post('/',createProduct);
productRouter.get('/:productId', getProductbyId);
productRouter.get('/', getAllProducts);
productRouter.post('/report/:productId', reportFaultProduct);

export default productRouter;