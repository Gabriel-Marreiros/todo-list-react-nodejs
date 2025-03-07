import { CronJob } from 'cron';
import { emailNotificationService, EmailNotificationService } from '../services/email.service';
import { KafkaService, kafkaService } from './../services/kafka.service';
import dayjs from 'dayjs';

export class TaskNotificationConsumer {

    constructor(
        private kafkaService: KafkaService,
        private emailService: EmailNotificationService
    ) { }

    public async start(): Promise<void> {
        try {
            await this.kafkaService.consumeMessages("task-notification-topic", "task-notification", async ({ message }): Promise<void> => {
                const { userEmail, userName, startDateTime, taskTitle } = JSON.parse(message.value!.toString());

                const now = dayjs();
                if(dayjs(startDateTime).isBefore(now)){
                    console.log("O horário de início da tarefa é inferior ao horario atual");
                    return;
                }

                CronJob.from({
                    cronTime: new Date(startDateTime),
                    timeZone: "America/Sao_Paulo",
                    start: true,
                    onTick: () => {
                        this.emailService.sendEmail({
                            to: userEmail,
                            subject: taskTitle,
                            text: `Olá ${userName} \n Está na hora de realizar a tarefa: ${taskTitle}`,
                            html: `
                                <p>Olá ${userName}</p>
                                <p>Está na hora de realizar a tarefa: ${taskTitle}</p>
                            `
                        })
                    },
                })

                console.log("Notificação de tarefa agendada com sucesso para:", new Date(startDateTime));
            })

            console.log("Job de Notificação de tarefas rodando");
        }
        catch (error) {
            console.log("Ocorreu um erro ao executar o job de Notificação de Tarefas");
            console.log(error);
        }

    }
};

export const taskNotificationConsumer = new TaskNotificationConsumer(
    kafkaService,
    emailNotificationService
);