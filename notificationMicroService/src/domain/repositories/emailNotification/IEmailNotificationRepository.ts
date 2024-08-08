import EmailNotificationModel from "../../../infrastructure/database/sequelize/models/emailNotification.model";

export interface IEmailNotificationRepository {
    getAllNotifications(): Promise<EmailNotificationModel[]>
    saveNotification(notification: { to: string, subject: string, message: string, sent: true }): Promise<EmailNotificationModel>;
}