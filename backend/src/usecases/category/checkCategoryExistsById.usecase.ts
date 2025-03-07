import categoryRepository from "../../repositories/category/category.repository";
import { ICategoryRepository } from "../../repositories/category/ICategoryRepository";
import { IUseCase } from "../IUseCase";

export class CheckCategoryExistsById implements IUseCase<string, Promise<boolean>> {

    constructor(
        private categoryRepository: ICategoryRepository
    ){}

    public async execute(categoryId: string): Promise<boolean> {
        const category = this.categoryRepository.getCategoryById(categoryId);

        return !!category;
    }
}

export const checkCategoryExistsById = new CheckCategoryExistsById(
    categoryRepository
);