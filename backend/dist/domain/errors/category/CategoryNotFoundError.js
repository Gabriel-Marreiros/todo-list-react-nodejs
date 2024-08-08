"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryNotFoundError = void 0;
class CategoryNotFoundError extends Error {
    constructor(title, message, status) {
        super();
        this.instance = "";
        this.title = title;
        this.message = message;
        this.status = status;
    }
}
exports.CategoryNotFoundError = CategoryNotFoundError;
