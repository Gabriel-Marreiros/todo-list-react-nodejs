import { Router } from "express";
import taskController from "../../application/controllers/task.controller";

const taskRouter = Router();

taskRouter.get("/", taskController.getAllUserTasks());
taskRouter.post("/", taskController.createTask());
taskRouter.get("/completed", taskController.getCompletedTasks());
taskRouter.get("/today", taskController.getTodaysTask());
taskRouter.get("/next", taskController.getNextTasks());
taskRouter.post("/complete", taskController.completeTaskById());
taskRouter.post("/complete-many", taskController.completeManyTasksById());
taskRouter.get("/:taskId", taskController.getTaskById());
taskRouter.put("/:taskId", taskController.updateTask());
taskRouter.delete("/:taskId", taskController.deleteTask());

export { taskRouter };
