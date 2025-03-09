import { Category } from "../../entities/category.entity";
import { ICategoryUpdateRequestDTO } from "../../dto/category/ICategoryUpdateRequestDTO";
import { ICreateCategoryRequestDTO } from "../../dto/category/ICreateCategoryRequestDTO";


export interface ICategoryService {
    updateCategory(categoryId: string, categoryUpdate: ICategoryUpdateRequestDTO): Promise<any>;
    
    deleteCategory(categoryId: string): Promise<any>;
    
    getAllUserCategories(userId: string): Promise<Category[]>;

    getCategoryById(categoryId: string): Promise<any>;

    saveCategory(category: ICreateCategoryRequestDTO): Promise<any>;
}