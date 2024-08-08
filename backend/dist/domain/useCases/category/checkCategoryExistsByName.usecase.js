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
exports.checkCategoryExistsByNameUseCase = exports.CheckCategoryExistsByNameUseCase = void 0;
const category_repository_1 = __importDefault(require("../../repositories/category/category.repository"));
class CheckCategoryExistsByNameUseCase {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    execute(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.getCategoryByName(categoryName);
            return !!category;
        });
    }
}
exports.CheckCategoryExistsByNameUseCase = CheckCategoryExistsByNameUseCase;
exports.checkCategoryExistsByNameUseCase = new CheckCategoryExistsByNameUseCase(category_repository_1.default);
