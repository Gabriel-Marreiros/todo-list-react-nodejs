import { Document } from "mongoose";
import categoryRepository from "../../repositories/category/category.repository";
import { ICategoryRepository } from "../../repositories/category/ICategoryRepository";
import { IUseCase } from "../IUseCase";

export class CheckCategoryExistsByNameUseCase implements IUseCase<string, Promise<boolean>> {

    constructor(
        private categoryRepository: ICategoryRepository
    ){}
    
    public async execute(categoryName: string): Promise<boolean> {
        const category: Document | null = await this.categoryRepository.getCategoryByName(categoryName);
        
        return !!category;
    }

}

export const checkCategoryExistsByNameUseCase = new CheckCategoryExistsByNameUseCase(
    categoryRepository
);