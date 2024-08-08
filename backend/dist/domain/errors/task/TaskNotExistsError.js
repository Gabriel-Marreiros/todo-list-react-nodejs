"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskNotExistsError = void 0;
class TaskNotExistsError extends Error {
    constructor(title, message, status) {
        super();
        this.instance = "";
        this.title = title;
        this.message = message;
        this.status = status;
    }
}
exports.TaskNotExistsError = TaskNotExistsError;
