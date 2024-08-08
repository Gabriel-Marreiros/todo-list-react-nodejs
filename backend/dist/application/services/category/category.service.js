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
exports.CategoryService = void 0;
const category_entity_1 = require("../../../domain/entities/category.entity");
const CategoryAlreadyExistsError_1 = require("../../../domain/errors/category/CategoryAlreadyExistsError");
const CategoryNotFoundError_1 = require("../../../domain/errors/category/CategoryNotFoundError");
const category_repository_1 = __importDefault(require("../../../domain/repositories/category/category.repository"));
const checkCategoryExistsById_usecase_1 = require("../../../domain/useCases/category/checkCategoryExistsById.usecase");
const checkCategoryExistsByName_usecase_1 = require("../../../domain/useCases/category/checkCategoryExistsByName.usecase");
class CategoryService {
    constructor(categoryRepository, checkCategoryExistsByNameUseCase, checkCategoryExistsById) {
        this.categoryRepository = categoryRepository;
        this.checkCategoryExistsByNameUseCase = checkCategoryExistsByNameUseCase;
        this.checkCategoryExistsById = checkCategoryExistsById;
    }
    updateCategory(categoryId, categoryUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryExists = yield this.checkCategoryExistsById.execute(categoryId);
            if (!categoryExists) {
                throw new CategoryNotFoundError_1.CategoryNotFoundError("Categoria não existe.", "A categoria pesquisada não existe.", 404);
            }
            const response = yield this.categoryRepository.updateCategory(categoryId, categoryUpdate);
            const category = category_entity_1.Category.with(response.toJSON());
            return category;
        });
    }
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryExists = yield this.checkCategoryExistsById.execute(categoryId);
            if (!categoryExists) {
                throw new CategoryNotFoundError_1.CategoryNotFoundError("Categoria não encontrada.", "A categoria pesquisada não foi encontrada.", 404);
            }
            const response = yield this.categoryRepository.deleteCategory(categoryId);
            const category = category_entity_1.Category.with(response.toJSON());
            return category;
        });
    }
    getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.categoryRepository.getCategoryById(categoryId);
            if (!response) {
                throw new CategoryNotFoundError_1.CategoryNotFoundError("Categoria não encontrada.", "A categoria pesquisada não foi encontrada.", 404);
            }
            const category = category_entity_1.Category.with(response.toJSON());
            return category;
        });
    }
    ;
    getAllUserCategories(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.categoryRepository.getAllUserCategories(userId);
            const categories = response.map((c) => category_entity_1.Category.with(c.toObject()));
            return categories;
        });
    }
    saveCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryAlreadyExists = yield this.checkCategoryExistsByNameUseCase.execute(category.name);
            if (categoryAlreadyExists) {
                throw new CategoryAlreadyExistsError_1.CategoryAlreadyExistsError("Categoria já existe.", "Já existe uma categoria com esse nome.", 400);
            }
            const response = yield this.categoryRepository.saveCategory(category);
            ;
            return response;
        });
    }
}
exports.CategoryService = CategoryService;
exports.default = new CategoryService(category_repository_1.default, checkCategoryExistsByName_usecase_1.checkCategoryExistsByNameUseCase, checkCategoryExistsById_usecase_1.checkCategoryExistsById);
