import { Router } from "express";
import authenticationController from "../../application/controllers/authentication.controller";

const authenticationRouter = Router();

authenticationRouter.post("/login", authenticationController.login());
authenticationRouter.post("/authenticate-token", authenticationController.authenticateToken());
authenticationRouter.post("/register", authenticationController.registerUser());

export { authenticationRouter };