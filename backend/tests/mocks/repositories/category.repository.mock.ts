import { ICategoryRepository } from "../../../src/repositories/category/ICategoryRepository";

export const categoryRepositoryMock: jest.Mocked<ICategoryRepository> = {
    getAllUserCategories: jest.fn(),
    getCategoryById: jest.fn(),
    saveCategory: jest.fn(),
    updateCategory: jest.fn(),
    getCategoryByName: jest.fn(),
    deleteCategory: jest.fn(),
};