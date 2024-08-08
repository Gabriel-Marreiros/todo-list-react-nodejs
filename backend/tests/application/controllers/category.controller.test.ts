import { NextFunction, Request, Response } from 'express';
import { ICategoryService } from '../../../src/application/services/category/ICategoryService';
import { CategoryController } from '../../../src/application/controllers/category.controller';
import { Category } from '../../../src/domain/entities/category.entity';
import { mockCategoryService } from '../../mocks/services/category.controller.mock.test';


const categoryController = new CategoryController(mockCategoryService);

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
            const categories: Category[] = [{ id: '1', name: 'Category1' }];
            
            mockCategoryService.getAllUserCategories.mockResolvedValueOnce(categories);
            mockRequest.header = jest.fn().mockReturnValue(userId);

            const handler = categoryController.getAllUserCategories();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockCategoryService.getAllUserCategories).toHaveBeenCalledWith(userId);
            expect(mockResponse.json).toHaveBeenCalledWith(categories);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('should call next with error on failed getAllUserCategories', async () => {
            const error = new Error('Failed to get categories');
            mockCategoryService.getAllUserCategories.mockRejectedValueOnce(error);

            const handler = categoryController.getAllUserCategories();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getCategoryById', () => {
        test('deve retornar categoria por id', async () => {
            const categoryId = 'testCategoryId';
            const category: Category = { id: categoryId, name: 'Category1' };

            mockCategoryService.getCategoryById.mockResolvedValueOnce(category);
            mockRequest.params = { categoryId };

            const handler = categoryController.getCategoryById();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockCategoryService.getCategoryById).toHaveBeenCalledWith(categoryId);
            expect(mockResponse.json).toHaveBeenCalledWith(category);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('should call next with error on failed getCategoryById', async () => {
            const error = new Error('Failed to get category');
            mockCategoryService.getCategoryById.mockRejectedValueOnce(error);

            const handler = categoryController.getCategoryById();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('createCategory', () => {
        test('Deveria criar uma categoria', async () => {
            const category: Category = { id: '1', name: 'Category1' };

            mockCategoryService.saveCategory.mockResolvedValueOnce(category);
            mockRequest.body = category;

            const handler = categoryController.createCategory();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockCategoryService.saveCategory).toHaveBeenCalledWith(category);
            expect(mockResponse.json).toHaveBeenCalledWith(category);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em createCategory com falha', async () => {
            const error = new Error('Failed to create category');
            mockCategoryService.saveCategory.mockRejectedValueOnce(error);

            const handler = categoryController.createCategory();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('updateCategory', () => {
        test('Deveria atualizar uma categoria', async () => {
            const categoryId = '1';
            const categoryUpdate = { name: 'UpdatedCategory' };
            const updatedCategory: Category = { id: categoryId, name: 'UpdatedCategory' };

            mockCategoryService.updateCategory.mockResolvedValueOnce(updatedCategory);
            mockRequest.params = { categoryId };
            mockRequest.body = categoryUpdate;

            const handler = categoryController.updateCategory();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockCategoryService.updateCategory).toHaveBeenCalledWith(categoryId, categoryUpdate);
            expect(mockResponse.json).toHaveBeenCalledWith(updatedCategory);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em updateCategory com falha', async () => {
            const error = new Error('Failed to update category');
            mockCategoryService.updateCategory.mockRejectedValueOnce(error);

            const handler = categoryController.updateCategory();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteCategory', () => {
        test('Deveria excluir uma categoria', async () => {
            const categoryId = '1';
            const deleteResponse = { success: true };

            mockCategoryService.deleteCategory.mockResolvedValueOnce(deleteResponse);
            mockRequest.params = { categoryId };

            const handler = categoryController.deleteCategory();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockCategoryService.deleteCategory).toHaveBeenCalledWith(categoryId);
            expect(mockResponse.json).toHaveBeenCalledWith(deleteResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em deleteCategory com falha', async () => {
            const error = new Error('Failed to delete category');
            mockCategoryService.deleteCategory.mockRejectedValueOnce(error);

            const handler = categoryController.deleteCategory();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});
