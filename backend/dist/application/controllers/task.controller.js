"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = __importDefault(require("../services/task/task.service"));
class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    getAllUserTasks() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.params.userId;
                const userTasks = yield this.taskService.getAllUserTasks(userId);
                response.json(userTasks).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    getTaskById() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = request.params.taskId;
                const task = yield task_service_1.default.getTaskById(taskId);
                response.json(task).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    createTask() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.header("user-id");
                const taskData = request.body;
                taskData.user = userId;
                const savedTask = yield this.taskService.saveTask(taskData);
                response.json(savedTask).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateTask() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = request.params.taskId;
                const taskUpdate = request.body;
                const updatedTask = yield this.taskService.updateTask(taskId, taskUpdate);
                response.json(updatedTask).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteTask() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = request.params.taskId;
                const deletedTask = yield this.taskService.deleteTask(taskId);
                response.json(deletedTask).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    getNextTasks() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.header("user-id");
                const nextTasks = yield this.taskService.getNextTasks(userId);
                response.json(nextTasks).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    getTodaysTask() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.header("user-id");
                const todaysTasks = yield this.taskService.getTodaysTask(userId);
                response.json(todaysTasks).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCompletedTasks() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.header("user-id");
                const completedTasks = yield this.taskService.getCompletedTasks(userId);
                response.json(completedTasks).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    completeTaskById() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = request.body.taskId;
                const completedTask = yield this.taskService.completeTaskById(taskId);
                response.json(completedTask).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    completeManyTasksById() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasksId = request.body;
                const completedTasks = yield this.taskService.completeManyTasksById(tasksId);
                response.json(completedTasks).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TaskController = TaskController;
exports.default = new TaskController(task_service_1.default);
