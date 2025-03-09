import { Document } from "mongoose";
import CategoryModel from "../../database/mongodb/schemas/category.schema";
import { ICategoryUpdateRequestDTO } from "../../dto/category/ICategoryUpdateRequestDTO";
import { ICreateCategoryRequestDTO } from "../../dto/category/ICreateCategoryRequestDTO";
import { ICategoryRepository } from "./ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {

    constructor() { }

    public async updateCategory(categoryId: string, categoryUpdate: ICategoryUpdateRequestDTO): Promise<Document | null> {
        const response = CategoryModel.findByIdAndUpdate(categoryId, categoryUpdate);

        return response;
    }

    public async deleteCategory(categoryId: string): Promise<Document | null> {
        const response = await CategoryModel.findByIdAndDelete(categoryId);

        return response;
    }

    public async getAllUserCategories(userId: string): Promise<Document[]> {
        const response = await CategoryModel.find().where({user: userId});

        return response;
    }

    public async getCategoryById(categoryId: string): Promise<Document | null> {
        const response = await CategoryModel.findById(categoryId);
        
        return response;
    }

    public async saveCategory(category: ICreateCategoryRequestDTO): Promise<Document> {
        const response = await CategoryModel.create(category);

        return response;
    }

    public async getCategoryByName(name: string): Promise<Document | null>{
        const category: Document | null = await CategoryModel.findOne({name});

        return category
    }
}

export default new CategoryRepository();