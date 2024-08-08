"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryAlreadyExistsError = void 0;
class CategoryAlreadyExistsError extends Error {
    constructor(title, message, status) {
        super();
        this.instance = "";
        this.title = title;
        this.message = message;
        this.status = status;
    }
}
exports.CategoryAlreadyExistsError = CategoryAlreadyExistsError;
