import { Router } from "express";
import taskController from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.get("/tasks/late", taskController.getLateTasks());
taskRouter.get("/tasks/summary", taskController.getTasksSummary());
taskRouter.get("/tasks/by-date", taskController.getTasksByDate());
taskRouter.get("/tasks/by-date-range", taskController.getTasksByDateRange());
taskRouter.get("/tasks/", taskController.getAllUserTasks());
taskRouter.post("/tasks/", taskController.createTask());
taskRouter.get("/tasks/completed", taskController.getCompletedTasks());
taskRouter.get("/tasks/today", taskController.getTodaysTask());
taskRouter.get("/tasks/next", taskController.getNextTasks());
taskRouter.post("/tasks/complete", taskController.completeTaskById());
taskRouter.post("/tasks/complete-many", taskController.completeManyTasksById());
taskRouter.get("/tasks/:taskId", taskController.getTaskById());
taskRouter.put("/tasks/:taskId", taskController.updateTask());
taskRouter.delete("/tasks/:taskId", taskController.deleteTask());

export { taskRouter };
