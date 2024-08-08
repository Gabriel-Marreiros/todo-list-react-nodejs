import { Router } from "express";
import emailNotificationController from "../../application/controllers/emailNotification.controller";

const emailNotificationRouter = Router();

emailNotificationRouter.put("/", emailNotificationController.getAllEmailNotifications());

export { emailNotificationRouter };