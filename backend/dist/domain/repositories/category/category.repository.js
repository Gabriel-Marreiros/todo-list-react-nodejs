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
exports.CategoryRepository = void 0;
const category_schema_1 = __importDefault(require("../../../infrastructure/database/mongodb/schemas/category.schema"));
class CategoryRepository {
    constructor() { }
    updateCategory(categoryId, categoryUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = category_schema_1.default.findByIdAndUpdate(categoryId, categoryUpdate);
            return response;
        });
    }
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield category_schema_1.default.findByIdAndDelete(categoryId);
            return response;
        });
    }
    getAllUserCategories(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield category_schema_1.default.find().where({ user: userId });
            return response;
        });
    }
    getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield category_schema_1.default.findById(categoryId);
            return response;
        });
    }
    saveCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield category_schema_1.default.create(category);
            return response;
        });
    }
    getCategoryByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_schema_1.default.findOne({ name });
            return category;
        });
    }
}
exports.CategoryRepository = CategoryRepository;
exports.default = new CategoryRepository();
