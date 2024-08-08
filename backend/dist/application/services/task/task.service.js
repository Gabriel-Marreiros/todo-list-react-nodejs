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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_entity_1 = require("../../../domain/entities/task.entity");
const TaskNotExistsError_1 = require("../../../domain/errors/task/TaskNotExistsError");
const task_repository_1 = require("../../../domain/repositories/task/task.repository");
const checkTaskExistsById_1 = require("../../../domain/useCases/task/checkTaskExistsById");
class TaskService {
    constructor(taskRepository, checkTaskExistsByIdUseCase) {
        this.taskRepository = taskRepository;
        this.checkTaskExistsByIdUseCase = checkTaskExistsByIdUseCase;
    }
    updateTask(taskId, taskUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskExists = yield this.checkTaskExistsByIdUseCase.execute(taskId);
            if (!taskExists) {
                throw new TaskNotExistsError_1.TaskNotExistsError("Tarefa não existe", "A tarefa solicitada não existe", 404);
            }
            const response = yield this.taskRepository.updateTask(taskId, taskUpdate);
            const task = task_entity_1.Task.with(response.toJSON());
            return task;
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskExists = yield this.checkTaskExistsByIdUseCase.execute(taskId);
            if (!taskExists) {
                throw new TaskNotExistsError_1.TaskNotExistsError("Tarefa não existe", "A tarefa solicitada não existe", 404);
            }
            const response = yield this.taskRepository.deleteTask(taskId);
            const task = task_entity_1.Task.with(response.toJSON());
            return task;
        });
    }
    getTaskById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.taskRepository.getTaskById(taskId);
            if (!response) {
                throw new TaskNotExistsError_1.TaskNotExistsError("Tarefa não existe", "A tarefa solicitada não existe", 404);
            }
            const task = task_entity_1.Task.with(response.toJSON());
            return task;
        });
    }
    ;
    getAllUserTasks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.taskRepository.getAllUserTasks(userId);
            const userTasks = response.map((t) => task_entity_1.Task.with(t.toJSON()));
            return userTasks;
        });
    }
    saveTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.taskRepository.saveTask(taskData);
            const task = task_entity_1.Task.with(response.toJSON());
            return task;
        });
    }
    getNextTasks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.taskRepository.getNextTasks(userId);
            const tasks = response.map((task) => task_entity_1.Task.with(task.toJSON()));
            return tasks;
        });
    }
    getTodaysTask(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.taskRepository.getTodaysTask(userId);
            const tasks = response.map((task) => task_entity_1.Task.with(task.toJSON()));
            return tasks;
        });
    }
    getCompletedTasks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.taskRepository.getCompletedTasks(userId);
            const tasks = response.map((task) => task_entity_1.Task.with(task.toJSON()));
            return tasks;
        });
    }
    completeTaskById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.taskRepository.completeTaskById(taskId);
            return response;
        });
    }
    completeManyTasksById(tasksId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.taskRepository.completeManyTasksById(tasksId);
            return response;
        });
    }
}
exports.TaskService = TaskService;
exports.default = new TaskService(task_repository_1.taskRepository, checkTaskExistsById_1.checkTaskExistsByIdUseCase);
