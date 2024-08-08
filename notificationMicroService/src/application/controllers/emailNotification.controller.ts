import { NextFunction, Request, RequestHandler, Response } from "express";
import { emailNotificationService, EmailNotificationService } from "../services/email.service";

export class EmailNotificationController {

    constructor(
        private emailNotificationsService: EmailNotificationService
    ) { }

    public getAllEmailNotifications (): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const notifications = await this.emailNotificationsService.getAllEmailNotifications();

                response.json(notifications).status(200).send();
            }
            catch (error) {
                next(error)
            }
        }
    }

}

export default new EmailNotificationController(emailNotificationService);