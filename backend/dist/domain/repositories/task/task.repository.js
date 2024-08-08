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
exports.taskRepository = void 0;
const task_schema_1 = __importDefault(require("../../../infrastructure/database/mongodb/schemas/task.schema"));
class TaskRepository {
    constructor() { }
    getTodaysTask(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const timezone = -3;
            const currentDate = new Date();
            const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
            startOfDay.setHours(startOfDay.getHours() + timezone);
            const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
            endOfDay.setHours(endOfDay.getHours() + timezone);
            const response = yield task_schema_1.default.find()
                .where({
                user: userId,
                startDateTime: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            })
                .sort({
                startDateTime: 1,
            })
                .populate("category")
                .exec();
            return response;
        });
    }
    getNextTasks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const timezone = -3;
            const currentDate = new Date();
            const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
            endOfDay.setHours(endOfDay.getHours() + timezone);
            const response = yield task_schema_1.default.find()
                .where({
                user: userId,
                startDateTime: {
                    $gt: endOfDay
                }
            })
                .sort({
                startDateTime: 1,
            })
                .populate("category")
                .exec();
            return response;
        });
    }
    getCompletedTasks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield task_schema_1.default.find()
                .where({
                user: userId,
                completed: true
            })
                .sort({
                startDateTime: 1,
            })
                .populate("category")
                .exec();
            return response;
        });
    }
    updateTask(taskId, taskUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield task_schema_1.default.findByIdAndUpdate(taskId, taskUpdate);
            return response;
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield task_schema_1.default.findByIdAndDelete(taskId);
            return response;
        });
    }
    getAllUserTasks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield task_schema_1.default.find()
                .where({
                user: userId
            })
                .sort({
                completed: 1,
                startDateTime: 1
            })
                .populate("category")
                .exec();
            return response;
        });
    }
    getTaskById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield task_schema_1.default.findById(taskId);
            return response;
        });
    }
    saveTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield task_schema_1.default.create(task);
            return response;
        });
    }
    completeTaskById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield task_schema_1.default.updateOne({ _id: taskId }, { $set: { completed: true } });
            return response;
        });
    }
    completeManyTasksById(tasksId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield task_schema_1.default.updateMany({ _id: { $in: tasksId } }, { $set: { completed: true } });
            return response;
        });
    }
}
exports.taskRepository = new TaskRepository();
