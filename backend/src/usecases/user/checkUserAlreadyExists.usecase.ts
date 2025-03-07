import { IUserRepository } from "../../repositories/user/IUserRepository";
import userRepository from "../../repositories/user/user.repository";
import { IUseCase } from "../IUseCase";

export class CheckUserAlreadyExistsUseCase implements IUseCase<string, Promise<boolean>> {

    constructor(
        private userRepository: IUserRepository
    ){}
    
    public async execute(email: string): Promise<boolean> {
        const user = await this.userRepository.getUserByEmail(email);

        return !!user;
    }

}

export default new CheckUserAlreadyExistsUseCase(userRepository);