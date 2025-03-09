import { Document } from "mongoose";
import { ICategoryUpdateRequestDTO } from "../../dto/category/ICategoryUpdateRequestDTO";
import { ICreateCategoryRequestDTO } from "../../dto/category/ICreateCategoryRequestDTO";

export interface ICategoryRepository {
    deleteCategory(categoryId: string): Promise<Document | null>;
    
    getAllUserCategories(userId: string): Promise<Document[]>;
    
    getCategoryById(categoryId: string): Promise<Document | null>;

    saveCategory(category: ICreateCategoryRequestDTO): Promise<Document>;

    getCategoryByName(categoryName: string): Promise<Document | null>;

    updateCategory(categoryId: string, categoryUpdate: ICategoryUpdateRequestDTO): Promise<Document | null>;
}