import EmailNotificationModel from "../../../infrastructure/database/sequelize/models/emailNotification.model";
import { IEmailNotificationRepository } from "./IEmailNotificationRepository";

export class EmailNotificationRepository implements IEmailNotificationRepository {

    constructor() { }

    public async getAllNotifications(): Promise<EmailNotificationModel[]> {
        const response = await EmailNotificationModel.findAll();

        return response;
    }

    public async saveNotification(notification: { to: string, subject: string, message: string, sent: true }): Promise<EmailNotificationModel> {
        const response = await EmailNotificationModel.create(notification);

        return response;
    }
}

export const emailNotificationRepository = new EmailNotificationRepository();