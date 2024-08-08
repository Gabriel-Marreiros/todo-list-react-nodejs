"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const category_entity_1 = require("./category.entity");
class Task {
    constructor(taskModel) {
        this.id = taskModel._id;
        this.title = taskModel.title;
        this.description = taskModel.description;
        this.category = taskModel.category ? category_entity_1.Category.with(taskModel.category) : null;
        this.recurrent = taskModel.recurrent;
        this.startDateTime = taskModel.startDateTime;
        this.endDateTime = taskModel.endDateTime;
        this.completed = taskModel.completed;
    }
    static with(taskModel) {
        return new Task(taskModel);
    }
}
exports.Task = Task;
