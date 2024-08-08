import { ICategoryRepository } from "../../../src/domain/repositories/category/ICategoryRepository";

export const mockCategoryRepository: jest.Mocked<ICategoryRepository> = {
    getAllUserCategories: jest.fn(),
    getCategoryById: jest.fn(),
    saveCategory: jest.fn(),
    updateCategory: jest.fn(),
    getCategoryByName: jest.fn(),
    deleteCategory: jest.fn(),
};