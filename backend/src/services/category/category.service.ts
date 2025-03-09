
import { Category } from "../../entities/category.entity";
import { CategoryAlreadyExistsError } from "../../errors/category/CategoryAlreadyExistsError";
import { CategoryNotFoundError } from "../../errors/category/CategoryNotFoundError";
import categoryRepository from "../../repositories/category/category.repository";
import { ICategoryRepository } from "../../repositories/category/ICategoryRepository";
import { checkCategoryExistsById, CheckCategoryExistsById } from "../../usecases/category/checkCategoryExistsById.usecase";
import { checkCategoryExistsByNameUseCase, CheckCategoryExistsByNameUseCase } from "../../usecases/category/checkCategoryExistsByName.usecase";
import { ICategoryUpdateRequestDTO } from "../../dto/category/ICategoryUpdateRequestDTO";
import { ICreateCategoryRequestDTO } from "../../dto/category/ICreateCategoryRequestDTO";
import { ICategoryService } from "./ICategoryService";

export class CategoryService implements ICategoryService {

    constructor(
        private categoryRepository: ICategoryRepository,
        private checkCategoryExistsByNameUseCase: CheckCategoryExistsByNameUseCase,
        private checkCategoryExistsById: CheckCategoryExistsById
    ){}

    public async updateCategory(categoryId: string, categoryUpdate: ICategoryUpdateRequestDTO): Promise<any> {
        const categoryExists: boolean = await this.checkCategoryExistsById.execute(categoryId);

        if(!categoryExists){
            throw new CategoryNotFoundError(
                "Categoria não existe.",
                "A categoria pesquisada não existe.",
                404
            )
        }

        const response = await this.categoryRepository.updateCategory(categoryId, categoryUpdate);

        const category: Category = Category.with(response!.toJSON());
        
        return category;
    }

    public async deleteCategory(categoryId: string): Promise<any> {
        const categoryExists: boolean = await this.checkCategoryExistsById.execute(categoryId);

        if(!categoryExists){
            throw new CategoryNotFoundError(
                "Categoria não encontrada.",
                "A categoria pesquisada não foi encontrada.",
                404
            )
        }

        const response = await this.categoryRepository.deleteCategory(categoryId);

        const category: Category = Category.with(response!.toJSON());

        return category;
    }
    
    public async getCategoryById(categoryId: string): Promise<Category> {
        const response = await this.categoryRepository.getCategoryById(categoryId);

        if(!response){
            throw new CategoryNotFoundError(
                "Categoria não encontrada.",
                "A categoria pesquisada não foi encontrada.",
                404
            )
        }

        const category: Category = Category.with(response.toJSON());

        return category;
    };

    public async getAllUserCategories(userId: string): Promise<Category[]> {
        const response = await this.categoryRepository.getAllUserCategories(userId);

        const categories: Category[] = response.map((c) => Category.with(c.toObject()));

        return categories;
    }

    public async saveCategory(category: ICreateCategoryRequestDTO): Promise<any> {
        const categoryAlreadyExists: boolean = await this.checkCategoryExistsByNameUseCase.execute(category.name);

        if(categoryAlreadyExists){
            throw new CategoryAlreadyExistsError(
                "Categoria já existe.",
                "Já existe uma categoria com esse nome.",
                400,
            );
        }

        const response = await this.categoryRepository.saveCategory(category);;

        return response;
    }
}

export const CategoryServiceImpl = new CategoryService(
    categoryRepository,
    checkCategoryExistsByNameUseCase,
    checkCategoryExistsById
);