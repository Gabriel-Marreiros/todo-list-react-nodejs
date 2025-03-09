
import { CheckCategoryExistsById } from "../../../src/usecases/category/checkCategoryExistsById.usecase";
import { categoryRepositoryMock } from "../../mocks/repositories/category.repository.mock";

// Instantiate CheckCategoryExistsById with the mocked repository
const checkCategoryExistsByIdInstance = new CheckCategoryExistsById(categoryRepositoryMock);

describe('CheckCategoryExistsById', () => {
    describe('execute', () => {
        test('should return true if the category exists', async () => {
            const categoryId = 'existingCategoryId';
            const mockCategory = { id: categoryId };
            
            categoryRepositoryMock.getCategoryById.mockResolvedValueOnce(mockCategory);

            const result = await checkCategoryExistsByIdInstance.execute(categoryId);

            expect(categoryRepositoryMock.getCategoryById).toHaveBeenCalledWith(categoryId);
            expect(result).toBe(true);
        });

        test('should return false if the category does not exist', async () => {
            const categoryId = 'nonExistingCategoryId';
            
            categoryRepositoryMock.getCategoryById.mockResolvedValueOnce(null);

            const result = await checkCategoryExistsByIdInstance.execute(categoryId);

            expect(categoryRepositoryMock.getCategoryById).toHaveBeenCalledWith(categoryId);
            expect(result).toBe(false);
        });
    });
});
