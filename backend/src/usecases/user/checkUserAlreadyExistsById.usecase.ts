import { IUserRepository } from "../../repositories/user/IUserRepository";
import userRepository from "../../repositories/user/user.repository";
import { IUseCase } from "../IUseCase";

export class CheckUserAlreadyExistsByIdUseCase implements IUseCase<string, Promise<boolean>> {

    constructor(
        private userRepository: IUserRepository
    ){}
    
    public async execute(userId: string): Promise<boolean> {
        const user = await this.userRepository.getUserById(userId);

        return !!user;
    }

}

export const checkUserAlreadyExistsByIdUseCase = new CheckUserAlreadyExistsByIdUseCase(userRepository);