import { Router } from "express";
import userController from "../../application/controllers/user.controller";

const userRouter = Router();

// userRouter.post("/", userController.createUser());
userRouter.put("/", userController.updateUser());
userRouter.delete("/", userController.deleteUser());

export { userRouter };