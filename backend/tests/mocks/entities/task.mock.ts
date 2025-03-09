import { Task } from "../../../src/entities/task.entity";
import { categoryMock } from "./category.mock";

export const taskMock: Task = {
    id: "TestId",
    title: "Test Task",
    description: "Test Task",
    category: categoryMock,
    completed: true,
    recurrent: false,
    startDateTime: new Date(),
    endDateTime: new Date(),
}