import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/users", userController.registerUser());
userRouter.put("/users", userController.updateUser());
userRouter.delete("/users", userController.deleteUser());

export { userRouter };