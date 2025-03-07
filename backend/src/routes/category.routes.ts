import { Router } from "express";
import categoryController from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter.get("/categories", categoryController.getAllUserCategories());
categoryRouter.post("/categories", categoryController.createCategory());
categoryRouter.get("/categories/:categoryId", categoryController.getCategoryById());
categoryRouter.put("/categories/:categoryId", categoryController.updateCategory());
categoryRouter.delete("/categories/:categoryId", categoryController.deleteCategory());

export { categoryRouter };
