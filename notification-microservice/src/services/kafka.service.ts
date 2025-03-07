import { EachMessageHandler, Kafka } from "kafkajs";
import * as dotenv from 'dotenv';
dotenv.config(); 

export class KafkaService {

    private kafka!: Kafka;
    private readonly kafkaUrl: string = process.env.KAFKA_URL!;

    constructor() {
        this.init();
    }

    private init(): void {
        try {
            if(!this.kafka){
                this.kafka = new Kafka({
                    clientId: "todo-list-notification-microservice-client",
                    brokers: [this.kafkaUrl],
                    ssl: false
                });
            }

            console.log("Kafka Client conectado ao host:", this.kafkaUrl);
        } 
        catch (error) {
            console.log("Ocorreu um erro ao conectar o Kafka Broker na URL: ", this.kafkaUrl)
            console.log(error);    
        }
    }

    public async consumeMessages(topic: string, groupId: string, messageHandler: EachMessageHandler ) {
        try {
            const kafkaConsumer = this.kafka.consumer({ groupId });
    
            await kafkaConsumer.connect();

            await kafkaConsumer.subscribe({ topics: [topic] });

            await kafkaConsumer.run({
                eachMessage: messageHandler
            })

            console.log("Kafka Consumer conectado e respondendo ao topico:", JSON.stringify(topic));
        } 
        catch (error) {
            console.log("Ocorreu um erro ao consumir a mensagem do Kafka Broker");
            console.log(error);
        }
    }

}

export const kafkaService = new KafkaService();