import { Router } from "express";
import categoryController from "../../application/controllers/category.controller";


const categoryRouter = Router();

categoryRouter.route("/categories");

categoryRouter.get("/", categoryController.getAllUserCategories());
categoryRouter.get("/:categoryId", categoryController.getCategoryById());
categoryRouter.post("/", categoryController.createCategory());
categoryRouter.put("/:categoryId", categoryController.updateCategory());
categoryRouter.delete("/:categoryId", categoryController.deleteCategory());

export { categoryRouter };
