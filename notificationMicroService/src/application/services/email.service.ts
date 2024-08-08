import nodemailer from 'nodemailer';
import EmailNotificationModel from '../../infrastructure/database/sequelize/models/emailNotification.model';
import { IEmailNotificationRepository } from '../../domain/repositories/emailNotification/IEmailNotificationRepository';
import { emailNotificationRepository } from '../../domain/repositories/emailNotification/emailNotification.repository';

export class EmailNotificationService {
    private transporter;

    constructor(
        private emailNotificationRepository: IEmailNotificationRepository,
    ) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    public async getAllEmailNotifications(): Promise<EmailNotificationModel[]> {
        const notifications = this.emailNotificationRepository.getAllNotifications();

        return notifications;
    }

    public async saveNotification(notification: { to: string, subject: string, message: string, sent: true }): Promise<EmailNotificationModel> {
        const notifications = this.emailNotificationRepository.saveNotification(notification);

        return notifications;
    }

    public async sendEmail(to: string, subject: string, message: string): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message,
        };

        await this.transporter.sendMail(mailOptions);
    }
}

export const emailNotificationService = new EmailNotificationService(
    emailNotificationRepository
);
