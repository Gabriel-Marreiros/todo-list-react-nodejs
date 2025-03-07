import { IKafkaService } from "../../../src/services/kafka/IKafkaService";

export const kafkaServiceMock: jest.Mocked<IKafkaService> = {
    produceMessage: jest.fn()
};