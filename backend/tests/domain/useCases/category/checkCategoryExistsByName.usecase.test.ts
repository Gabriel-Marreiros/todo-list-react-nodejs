import { Document } from "mongoose";
import { mockCategoryRepository } from "../../../mocks/repositories/category.repository.mock.test";
import { CheckCategoryExistsByNameUseCase } from "../../../../src/domain/useCases/category/checkCategoryExistsByName.usecase";

const checkCategoryExistsByNameUseCase = new CheckCategoryExistsByNameUseCase(mockCategoryRepository);

describe('CheckCategoryExistsByNameUseCase', () => {
    describe('execute', () => {
        test('should return true if the category exists', async () => {
            const categoryName = 'existingCategoryName';
            const mockCategory = {  }
            
            mockCategoryRepository.getCategoryByName.mockResolvedValueOnce(mockCategory);

            const result = await checkCategoryExistsByNameUseCase.execute(categoryName);

            expect(mockCategoryRepository.getCategoryByName).toHaveBeenCalledWith(categoryName);
            expect(result).toBe(true);
        });

        test('should return false if the category does not exist', async () => {
            const categoryName = 'nonExistingCategoryName';
            
            mockCategoryRepository.getCategoryByName.mockResolvedValueOnce(null);

            const result = await checkCategoryExistsByNameUseCase.execute(categoryName);

            expect(mockCategoryRepository.getCategoryByName).toHaveBeenCalledWith(categoryName);
            expect(result).toBe(false);
        });
    });
});
