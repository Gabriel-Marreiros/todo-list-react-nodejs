import { ICategoryUpdateRequestDTO } from "../../src/dto/category/ICategoryUpdateRequestDTO";
import { ICreateCategoryRequestDTO } from "../../src/dto/category/ICreateCategoryRequestDTO";
import { Category } from "../../src/entities/category.entity";
import { CategoryAlreadyExistsError } from "../../src/errors/category/CategoryAlreadyExistsError";
import { CategoryNotFoundError } from "../../src/errors/category/CategoryNotFoundError";
import { CheckCategoryExistsById } from "../../src/usecases/category/checkCategoryExistsById.usecase";
import { categoryRepositoryMock } from "../mocks/repositories/category.repository.mock";

const mockCheckCategoryExistsByNameUseCase: jest.Mocked<CheckCategoryExistsByNameUseCase> = {
    execute: jest.fn()
};

const mockCheckCategoryExistsByIdUseCase: jest.Mocked<CheckCategoryExistsById> = {
    execute: jest.fn()
};

const categoryService = new CategoryService(
    categoryRepositoryMock,
    mockCheckCategoryExistsByNameUseCase,
    mockCheckCategoryExistsByIdUseCase
);

describe('CategoryService', () => {
    describe('updateCategory', () => {
        test('should update a category if it exists', async () => {
            const categoryId = '1';
            const categoryUpdate: ICategoryUpdateRequestDTO = { name: 'Updated Category' };
            const updatedCategory = { toJSON: () => ({ id: categoryId, name: 'Updated Category' }) };

            mockCheckCategoryExistsByIdUseCase.execute.mockResolvedValueOnce(true);
            mockCategoryRepository.updateCategory.mockResolvedValueOnce(updatedCategory);

            const result = await categoryService.updateCategory(categoryId, categoryUpdate);

            expect(mockCheckCategoryExistsByIdUseCase.execute).toHaveBeenCalledWith(categoryId);
            expect(mockCategoryRepository.updateCategory).toHaveBeenCalledWith(categoryId, categoryUpdate);
            expect(result).toEqual(Category.with(updatedCategory.toJSON()));
        });

        test('should throw CategoryNotFoundError if the category does not exist', async () => {
            const categoryId = '1';
            const categoryUpdate: ICategoryUpdateRequestDTO = { name: 'Updated Category' };

            mockCheckCategoryExistsByIdUseCase.execute.mockResolvedValueOnce(false);

            await expect(categoryService.updateCategory(categoryId, categoryUpdate)).rejects.toThrow(CategoryNotFoundError);
        });
    });

    describe('deleteCategory', () => {
        test('should delete a category if it exists', async () => {
            const categoryId = '1';
            const deletedCategory = { toJSON: () => ({ id: categoryId, name: 'Category to Delete' }) };

            mockCheckCategoryExistsByIdUseCase.execute.mockResolvedValueOnce(true);
            mockCategoryRepository.deleteCategory.mockResolvedValueOnce(deletedCategory);

            const result = await categoryService.deleteCategory(categoryId);

            expect(mockCheckCategoryExistsByIdUseCase.execute).toHaveBeenCalledWith(categoryId);
            expect(mockCategoryRepository.deleteCategory).toHaveBeenCalledWith(categoryId);
            expect(result).toEqual(Category.with(deletedCategory.toJSON()));
        });

        test('should throw CategoryNotFoundError if the category does not exist', async () => {
            const categoryId = '1';

            mockCheckCategoryExistsByIdUseCase.execute.mockResolvedValueOnce(false);

            await expect(categoryService.deleteCategory(categoryId)).rejects.toThrow(CategoryNotFoundError);
        });
    });

    describe('getCategoryById', () => {
        test('should return a category if it exists', async () => {
            const categoryId = '1';
            const category = { toJSON: () => ({ id: categoryId, name: 'Existing Category' }) };

            mockCategoryRepository.getCategoryById.mockResolvedValueOnce(category);

            const result = await categoryService.getCategoryById(categoryId);

            expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(categoryId);
            expect(result).toEqual(Category.with(category.toJSON()));
        });

        test('should throw CategoryNotFoundError if the category does not exist', async () => {
            const categoryId = '1';

            mockCategoryRepository.getCategoryById.mockResolvedValueOnce(null);

            await expect(categoryService.getCategoryById(categoryId)).rejects.toThrow(CategoryNotFoundError);
        });
    });

    describe('getAllUserCategories', () => {
        test('should return all categories for a user', async () => {
            const userId = 'user1';
            const categories = [{ toObject: () => ({ id: '1', name: 'Category 1' }) }];

            mockCategoryRepository.getAllUserCategories.mockResolvedValueOnce(categories);

            const result = await categoryService.getAllUserCategories(userId);

            expect(mockCategoryRepository.getAllUserCategories).toHaveBeenCalledWith(userId);
            expect(result).toEqual(categories.map(c => Category.with(c.toObject())));
        });
    });

    describe('saveCategory', () => {
        test('should save a category if it does not already exist', async () => {
            const categoryData: ICreateCategoryRequestDTO = { name: 'New Category' };
            const savedCategory = { toJSON: () => ({ id: '1', name: 'New Category' }) };

            mockCheckCategoryExistsByNameUseCase.execute.mockResolvedValueOnce(false);
            mockCategoryRepository.saveCategory.mockResolvedValueOnce(savedCategory);

            const result = await categoryService.saveCategory(categoryData);

            expect(mockCheckCategoryExistsByNameUseCase.execute).toHaveBeenCalledWith(categoryData.name);
            expect(mockCategoryRepository.saveCategory).toHaveBeenCalledWith(categoryData);
            expect(result).toEqual(savedCategory);
        });

        test('should throw CategoryAlreadyExistsError if the category already exists', async () => {
            const categoryData: ICreateCategoryRequestDTO = { name: 'Existing Category' };

            mockCheckCategoryExistsByNameUseCase.execute.mockResolvedValueOnce(true);

            await expect(categoryService.saveCategory(categoryData)).rejects.toThrow(CategoryAlreadyExistsError);
        });
    });
});
