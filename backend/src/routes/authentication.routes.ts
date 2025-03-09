import { Router } from "express";
import authenticationController from "../controllers/authentication.controller";

const authenticationRouter = Router();

authenticationRouter.post("/auth/login", authenticationController.login());
authenticationRouter.post("/auth/register-user", authenticationController.registerUser());
authenticationRouter.post("/auth/authenticate-token", authenticationController.authenticateToken());

export { authenticationRouter };