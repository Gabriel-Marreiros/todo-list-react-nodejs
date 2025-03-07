import nodemailer, { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import * as dotenv from 'dotenv';
dotenv.config(); 

export class EmailNotificationService {
    private transporter!: Transporter;

    constructor() {
        this.configureTransport();
    }

    private configureTransport(): void {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            from: process.env.EMAIL_SENDER,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }

    public async sendEmail(mail: Pick<Mail.Options, "to" | "subject" | "text" | "html">): Promise<void> {
        try {
            await this.transporter.sendMail(mail);

            console.log("Email enviado com sucesso para", mail.to);
        } 
        catch (error) {
            console.log("Ocorreu um erro ao enviar e-mail para", mail.to);
            console.log(error);
        }
    }
}

export const emailNotificationService = new EmailNotificationService();
