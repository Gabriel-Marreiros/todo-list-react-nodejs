import { ITaskRepository } from "../../repositories/task/ITaskRepository";
import { taskRepository } from "../../repositories/task/task.repository";
import { IUseCase } from "../IUseCase";

export class CheckTaskExistsByIdUseCase implements IUseCase<string, Promise<boolean>> {

    constructor(
        private taskRepository: ITaskRepository
    ){}

    public async execute(taskId: string): Promise<boolean> {
        const task = await this.taskRepository.getTaskById(taskId);

        return !!task;
    }
}

export const checkTaskExistsByIdUseCase = new CheckTaskExistsByIdUseCase(
    taskRepository
);