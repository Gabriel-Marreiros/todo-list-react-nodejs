import { CategoryServiceImpl } from './../services/category/category.service';
import { NextFunction, Request, RequestHandler, Response } from "express";
import { ICategoryService } from "../services/category/ICategoryService";
import { Category } from "../entities/category.entity";
import { ICategoryUpdateRequestDTO } from "../dto/category/ICategoryUpdateRequestDTO";
import { ICreateCategoryRequestDTO } from "../dto/category/ICreateCategoryRequestDTO";

export class CategoryController {

    constructor(
        private categoryService: ICategoryService
    ) { }

    public getAllUserCategories(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.header("user-id")!;

                const categories: Category[] = await this.categoryService.getAllUserCategories(userId);

                response.json(categories).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public getCategoryById(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const categoryId: string = request.params.categoryId;

                const category: Category = await this.categoryService.getCategoryById(categoryId);

                response.json(category).status(200);

            }
            catch (error) {
                next(error)
            }
        }
    }

    public createCategory(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.header("user-id")!;

                const category: ICreateCategoryRequestDTO = request.body;
                category.user = userId


                const createdCategory: Category = await this.categoryService.saveCategory(category);

                response.json(createdCategory).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public updateCategory(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const categoryId: string = request.params.categoryId;
                const categoryUpdate: ICategoryUpdateRequestDTO = request.body;

                const updatedCategory: Category = await this.categoryService.updateCategory(categoryId, categoryUpdate);

                response.json(updatedCategory).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public deleteCategory(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const categoryId: string = request.params.categoryId;

                const resp = await this.categoryService.deleteCategory(categoryId);

                response.json(resp).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

}

export default new CategoryController(CategoryServiceImpl);