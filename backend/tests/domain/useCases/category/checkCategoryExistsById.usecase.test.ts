
import { CheckCategoryExistsById } from "../../../../src/domain/useCases/category/checkCategoryExistsById.usecase";
import { mockCategoryRepository } from "../../../mocks/repositories/category.repository.mock.test";

// Instantiate CheckCategoryExistsById with the mocked repository
const checkCategoryExistsByIdInstance = new CheckCategoryExistsById(mockCategoryRepository);

describe('CheckCategoryExistsById', () => {
    describe('execute', () => {
        test('should return true if the category exists', async () => {
            const categoryId = 'existingCategoryId';
            const mockCategory = { id: categoryId };
            
            mockCategoryRepository.getCategoryById.mockResolvedValueOnce(mockCategory);

            const result = await checkCategoryExistsByIdInstance.execute(categoryId);

            expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(categoryId);
            expect(result).toBe(true);
        });

        test('should return false if the category does not exist', async () => {
            const categoryId = 'nonExistingCategoryId';
            
            mockCategoryRepository.getCategoryById.mockResolvedValueOnce(null);

            const result = await checkCategoryExistsByIdInstance.execute(categoryId);

            expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(categoryId);
            expect(result).toBe(false);
        });
    });
});
