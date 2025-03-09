import { Kafka } from "kafkajs";
import { IKafkaService } from "./IKafkaService";

class KafkaService implements IKafkaService {
    private kafka!: Kafka;
    private readonly kafkaUrl: string = process.env.KAFKA_URL!;

    constructor() {
        this.init();
    }

    private init(): void {
        try {
            if(!this.kafka){
                this.kafka = new Kafka({
                    clientId: "todo-list-backend-client",
                    brokers: [this.kafkaUrl],
                    ssl: false
                });
            }    
            console.log("Kafka Client conectado ao host:", this.kafkaUrl);
        } 
        catch (error) {
            console.log(error);    
        }
    }

    public async produceMessage(topic: string, message: any): Promise<void> {
        try {
            const kafkaProducer = this.kafka.producer();

            await kafkaProducer.connect();

            await kafkaProducer.send({
                topic,
                messages: [{
                    value: JSON.stringify(message),
                }]
            })
            
            console.log("Mensagem publicada com sucesso no Kafka Broker:", this.kafkaUrl);

            await kafkaProducer.disconnect();

        } catch (error) {
            console.log(error)
        }
    }

}

export const KafkaServiceImpl = new KafkaService();