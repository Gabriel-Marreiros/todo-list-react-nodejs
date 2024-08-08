"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = __importDefault(require("../services/category/category.service"));
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getAllUserCategories() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.header("user-id");
                const categories = yield this.categoryService.getAllUserCategories(userId);
                response.json(categories).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCategoryById() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = request.params.categoryId;
                const category = yield this.categoryService.getCategoryById(categoryId);
                response.json(category).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    createCategory() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.header("user-id");
                const category = request.body;
                category.user = userId;
                const createdCategory = yield this.categoryService.saveCategory(category);
                response.json(createdCategory).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateCategory() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = request.params.categoryId;
                const categoryUpdate = request.body;
                const updatedCategory = yield this.categoryService.updateCategory(categoryId, categoryUpdate);
                response.json(updatedCategory).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteCategory() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = request.params.categoryId;
                const resp = yield this.categoryService.deleteCategory(categoryId);
                response.json(resp).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CategoryController = CategoryController;
exports.default = new CategoryController(category_service_1.default);
