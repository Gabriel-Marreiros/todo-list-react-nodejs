import amqp from 'amqplib/callback_api';

export class RabbitMQService {
    private rabbitmqUrl = process.env.rabbitmqUrl!;
    private queueName = 'email_notifications';

  constructor(
  ) { }

  public publishEmailNotificationMessage(message: object): void {
    amqp.connect(this.rabbitmqUrl, (err, connection) => {
      if (err) {
        throw err;
      }
      connection.createChannel((err, channel) => {
        if (err) {
          throw err;
        }

        channel.assertQueue(this.queueName, {
          durable: true,
        });

        channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)), {
          persistent: true,
        });
      });

      setTimeout(() => {
        connection.close();
      }, 500);
    });
  }
}

export const rabbitMQService = new RabbitMQService();