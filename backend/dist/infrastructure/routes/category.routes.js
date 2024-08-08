"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../../application/controllers/category.controller"));
const categoryRouter = (0, express_1.Router)();
exports.categoryRouter = categoryRouter;
categoryRouter.route("/categories");
categoryRouter.get("/", category_controller_1.default.getAllUserCategories());
categoryRouter.get("/:categoryId", category_controller_1.default.getCategoryById());
categoryRouter.post("/", category_controller_1.default.createCategory());
categoryRouter.put("/:categoryId", category_controller_1.default.updateCategory());
categoryRouter.delete("/:categoryId", category_controller_1.default.deleteCategory());
