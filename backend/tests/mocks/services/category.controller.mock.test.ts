import { ICategoryService } from "../../../src/application/services/category/ICategoryService";

export const mockCategoryService: jest.Mocked<ICategoryService> = {
    getAllUserCategories: jest.fn(),
    getCategoryById: jest.fn(),
    saveCategory: jest.fn(),
    updateCategory: jest.fn(),
    deleteCategory: jest.fn(),
};