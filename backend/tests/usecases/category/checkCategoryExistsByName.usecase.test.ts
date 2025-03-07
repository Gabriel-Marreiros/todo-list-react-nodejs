import { CheckCategoryExistsByNameUseCase } from "../../../src/usecases/category/checkCategoryExistsByName.usecase";
import { categoryRepositoryMock } from "../../mocks/repositories/category.repository.mock";

const checkCategoryExistsByNameUseCase = new CheckCategoryExistsByNameUseCase(categoryRepositoryMock);

describe('CheckCategoryExistsByNameUseCase', () => {
    describe('execute', () => {
        test('should return true if the category exists', async () => {
            const categoryName = 'existingCategoryName';
            const mockCategory = {  }
            
            categoryRepositoryMock.getCategoryByName.mockResolvedValueOnce(mockCategory);

            const result = await checkCategoryExistsByNameUseCase.execute(categoryName);

            expect(categoryRepositoryMock.getCategoryByName).toHaveBeenCalledWith(categoryName);
            expect(result).toBe(true);
        });

        test('should return false if the category does not exist', async () => {
            const categoryName = 'nonExistingCategoryName';
            
            categoryRepositoryMock.getCategoryByName.mockResolvedValueOnce(null);

            const result = await checkCategoryExistsByNameUseCase.execute(categoryName);

            expect(categoryRepositoryMock.getCategoryByName).toHaveBeenCalledWith(categoryName);
            expect(result).toBe(false);
        });
    });
});
