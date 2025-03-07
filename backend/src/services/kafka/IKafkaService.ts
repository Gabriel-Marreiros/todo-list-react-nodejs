export interface IKafkaService {
    produceMessage(topic: string, message: any): Promise<void>
}