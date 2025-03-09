import { NextFunction, Request, Response } from 'express';
import { CategoryController } from '../../src/controllers/category.controller';
import { Category } from '../../src/entities/category.entity';
import { categoryMock } from '../mocks/entities/category.mock';
import { categoryServiceMock } from '../mocks/services/category.service.mock';


const categoryController = new CategoryController(categoryServiceMock);

describe('CategoryController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: Partial<NextFunction>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn();
    });

    describe('getAllUserCategories', () => {
        test('Deve retornar todas as categorias de usuários', async () => {
            const userId = 'testUserId';
            const categories: Category[] = [categoryMock];
            
            categoryServiceMock.getAllUserCategories.mockResolvedValueOnce(categories);
            mockRequest.header = jest.fn().mockReturnValue(userId);

            const handler = categoryController.getAllUserCategories();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(categoryServiceMock.getAllUserCategories).toHaveBeenCalledWith(userId);
            expect(mockResponse.json).toHaveBeenCalledWith(categories);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('should call next with error on failed getAllUserCategories', async () => {
            const error = new Error('Failed to get categories');
            categoryServiceMock.getAllUserCategories.mockRejectedValueOnce(error);

            const handler = categoryController.getAllUserCategories();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getCategoryById', () => {
        test('deve retornar categoria por id', async () => {
            const categoryId = 'testCategoryId';
            const category: Category = categoryMock;

            categoryServiceMock.getCategoryById.mockResolvedValueOnce(category);
            mockRequest.params = { categoryId };

            const handler = categoryController.getCategoryById();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(categoryServiceMock.getCategoryById).toHaveBeenCalledWith(categoryId);
            expect(mockResponse.json).toHaveBeenCalledWith(category);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('should call next with error on failed getCategoryById', async () => {
            const error = new Error('Failed to get category');
            categoryServiceMock.getCategoryById.mockRejectedValueOnce(error);

            const handler = categoryController.getCategoryById();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('createCategory', () => {
        test('Deveria criar uma categoria', async () => {
            const category: Category = categoryMock;

            categoryServiceMock.saveCategory.mockResolvedValueOnce(category);
            mockRequest.body = category;

            const handler = categoryController.createCategory();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(categoryServiceMock.saveCategory).toHaveBeenCalledWith(category);
            expect(mockResponse.json).toHaveBeenCalledWith(category);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em createCategory com falha', async () => {
            const error = new Error('Failed to create category');
            categoryServiceMock.saveCategory.mockRejectedValueOnce(error);

            const handler = categoryController.createCategory();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('updateCategory', () => {
        test('Deveria atualizar uma categoria', async () => {
            const categoryId = '1';
            const categoryUpdate = { name: 'UpdatedCategory' };
            const updatedCategory: Category = categoryMock;

            categoryServiceMock.updateCategory.mockResolvedValueOnce(updatedCategory);
            mockRequest.params = { categoryId };
            mockRequest.body = categoryUpdate;

            const handler = categoryController.updateCategory();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(categoryServiceMock.updateCategory).toHaveBeenCalledWith(categoryId, categoryUpdate);
            expect(mockResponse.json).toHaveBeenCalledWith(updatedCategory);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em updateCategory com falha', async () => {
            const error = new Error('Failed to update category');
            categoryServiceMock.updateCategory.mockRejectedValueOnce(error);

            const handler = categoryController.updateCategory();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteCategory', () => {
        test('Deveria excluir uma categoria', async () => {
            const categoryId = 'TestId';
            const deletedCategory = categoryMock;

            categoryServiceMock.deleteCategory.mockResolvedValueOnce(deletedCategory);
            mockRequest.params = { categoryId };

            const handler = categoryController.deleteCategory();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(categoryServiceMock.deleteCategory).toHaveBeenCalledWith(categoryId);
            expect(mockResponse.json).toHaveBeenCalledWith(deletedCategory);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em deleteCategory com falha', async () => {
            const error = new Error('Failed to delete category');
            categoryServiceMock.deleteCategory.mockRejectedValueOnce(error);

            const handler = categoryController.deleteCategory();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});
