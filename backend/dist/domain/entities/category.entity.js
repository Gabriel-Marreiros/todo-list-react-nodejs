"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    constructor(categoryModel) {
        this.id = categoryModel._id;
        this.name = categoryModel.name;
        this.backgroundColor = categoryModel.backgroundColor;
        this.textColor = categoryModel.textColor;
    }
    static with(categoryModel) {
        return new Category(categoryModel);
    }
}
exports.Category = Category;
