import { ICategoryService } from "../../../src/services/category/ICategoryService";

export const categoryServiceMock: jest.Mocked<ICategoryService> = {
    getAllUserCategories: jest.fn(),
    getCategoryById: jest.fn(),
    saveCategory: jest.fn(),
    updateCategory: jest.fn(),
    deleteCategory: jest.fn(),
};