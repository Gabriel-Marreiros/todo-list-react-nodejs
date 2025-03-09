import { emailNotificationService, EmailNotificationService } from '../services/email.service';
import { KafkaService, kafkaService } from './../services/kafka.service';

export class WelcomeNotificationConsumer {

    constructor(
        private kafkaService: KafkaService,
        private emailService: EmailNotificationService
    ) { }

    public async start(): Promise<void> {
        try {
            await this.kafkaService.consumeMessages("welcome-notification-topic", "welcome-notification", async ({ message }) => {
                const { userEmail, userName } = JSON.parse(message.value!.toString());

                await this.emailService.sendEmail({
                    to: userEmail,
                    subject: "Bem vindo",
                    text: `Bem vindo ao Todo List React & Node.js, ${userName}!`,
                    html: `
                        <p>Bem vindo ao Todo List React & Node.js, ${userName}!</p>
                    `
                });
            })

            console.log("Job de notificação de boas-vindas rodando");
        }
        catch (error) {
            console.log("Ocorreu um erro ao executar o job de notificação de boas-vindas");
            console.log(error);
        }
    }
};

export const welcomeNotificationConsumer = new WelcomeNotificationConsumer(
    kafkaService,
    emailNotificationService
);