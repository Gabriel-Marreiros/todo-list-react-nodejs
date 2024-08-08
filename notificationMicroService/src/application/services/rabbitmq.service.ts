import amqp from 'amqplib/callback_api';
import { emailNotificationService, EmailNotificationService } from './email.service';

class RabbitMQService {

    constructor(
        private emailNotificationService: EmailNotificationService,
        private rabbitmqUrl = process.env.RABBITMQ_URL!,
        private queueName = 'email_notifications',
    ) { }

    public consumeQueue(): void {
        amqp.connect(this.rabbitmqUrl, (error, connection) => {
            if (error) {
                console.log(error)
                throw error;
            }

            connection.createChannel((err, channel) => {
                if (err) {
                    throw err;
                }

                channel.assertQueue(this.queueName, { durable: true });

                channel.consume(this.queueName, async (msg: any) => {
                    const { to, subject, message } = JSON.parse(msg.content.toString());

                    try {
                        await this.emailNotificationService.saveNotification({ to, subject, message, sent: true });
                        //TODO configurar o nodemailer
                        // await this.emailNotificationService.sendEmail(to, subject, message);
                        console.log(msg);
                        channel.ack(msg);
                    }
                    catch (error) {
                        console.error(error);
                    }
                }, {
                    noAck: false,
                });

            });
        });
    }
}

export default new RabbitMQService(
    emailNotificationService
);
