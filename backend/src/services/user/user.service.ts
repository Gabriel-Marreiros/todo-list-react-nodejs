
import { User } from "../../entities/user.entity";
import { UserAlreadyExistsError } from "../../errors/user/UserAlreadyExistsError";
import { UserNotExistsError } from "../../errors/user/UserNotExistsError";
import { IUserRepository } from "../../repositories/user/IUserRepository";
import userRepository from "../../repositories/user/user.repository";
import checkUserAlreadyExistsUsecase, { CheckUserAlreadyExistsUseCase } from "../../usecases/user/checkUserAlreadyExists.usecase";
import { checkUserAlreadyExistsByIdUseCase, CheckUserAlreadyExistsByIdUseCase } from "../../usecases/user/checkUserAlreadyExistsById.usecase";
import { encryptUserPasswordUseCase, EncryptUserPasswordUseCase } from "../../usecases/user/encryptUserPassword.usecase";
import { IUserService } from "./IUserService";

export class UserService implements IUserService {

    constructor(
        private userRepository: IUserRepository,
        private checkUserAlreadyExistsUseCase: CheckUserAlreadyExistsUseCase,
        private checkUserAlreadyExistsByIdUseCase: CheckUserAlreadyExistsByIdUseCase,
        private encryptUserPasswordUseCase: EncryptUserPasswordUseCase
    ) { }

    public async createUser(user: User): Promise<User> {

        const userAlreadyExists: boolean = await this.checkUserAlreadyExistsUseCase.execute(user.email);

        if (userAlreadyExists) {
            throw new UserAlreadyExistsError(
                "Usuário já existe.",
                "Já existe um usuário com este e-mail.",
                400
            );
        }

        user.password = await this.encryptUserPasswordUseCase.execute(user.password);

        const response = await this.userRepository.createUser(user);

        const createdUser: User = User.with(response.toJSON());

        return createdUser;
    }

    public async updateUser(userId: string, userUpdate: any): Promise<any> {
        const userExists: boolean = await this.checkUserAlreadyExistsByIdUseCase.execute(userId);

        if (!userExists) {
            throw new UserNotExistsError(
                "Usuário não existe.",
                "O usuário solicitado não existe.",
                400
            );
        }

        const response = await this.userRepository.updateUser(userId, userUpdate);

        const updatedUser: User = User.with(response!.toJSON());

        return updatedUser;
    }

    public async deleteUser(userId: string): Promise<any> {
        const userExists: boolean = await this.checkUserAlreadyExistsByIdUseCase.execute(userId);

        if (!userExists) {
            throw new UserNotExistsError(
                "Usuário não existe.",
                "O usuário solicitado não existe.",
                400
            );
        }

        const response = await this.userRepository.deleteUser(userId);

        const deletedUser: User = User.with(response!.toJSON());

        return deletedUser;
    }

}

export const UserServiceImpl = new UserService(
    userRepository,
    checkUserAlreadyExistsUsecase,
    checkUserAlreadyExistsByIdUseCase,
    encryptUserPasswordUseCase
);