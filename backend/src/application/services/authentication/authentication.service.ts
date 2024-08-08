
import { User } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import userRepository from "../../../domain/repositories/user/user.repository";
import { generateTokenUseCase, GenerateTokenUseCase } from "../../../domain/useCases/jwt/generateToken.usecase";
import { validateTokenUseCase, ValidateTokenUseCase } from "../../../domain/useCases/jwt/validateToken.usecase";
import { checkPasswordIsCorrectUseCase, CheckPasswordIsCorrectUseCase } from "../../../domain/useCases/user/checkPasswordIsCorrect.usecase";
import { ILoginRequestDTO } from "../../dto/auth/ILoginRequestDTO";
import { IRegisterUserResponseDTO } from "../../dto/user/IRegisterUserResponseDTO";
import { IUserService } from "../user/IUserService";
import userService from "../user/user.service";
import { IAuthenticationService } from "./IAuthenticationService";

export class AuthenticationService implements IAuthenticationService {

    constructor(
        private userRepository: IUserRepository,
        private generateTokenUseCase: GenerateTokenUseCase,
        private checkPasswordIsCorrectUseCase: CheckPasswordIsCorrectUseCase,
        private userService: IUserService,
        private validateTokenUseCase: ValidateTokenUseCase
    ) { }

    public async registerUser(userData: User): Promise<IRegisterUserResponseDTO> {
        const createdUser: User = await this.userService.createUser(userData);

        const token: string = this.generateTokenUseCase.execute(createdUser);

        const response: IRegisterUserResponseDTO = {
            token,
            createdUser
        }

        return response;
    }

    public async login(loginData: ILoginRequestDTO): Promise<{ userToken: string }> {
        const response = await this.userRepository.getUserByEmail(loginData.email);

        if (!response) {
            throw new Error("Usuário ou senha incorretos.");
        }

        const user: User = User.with(response.toJSON());

        const passwordIsCorrect: boolean = await this.checkPasswordIsCorrectUseCase.execute({
            inputPassword: loginData.password,
            userPassword: user.password
        });

        if (!passwordIsCorrect) {
            throw new Error("Usuário ou senha incorretos.");
        }

        const userToken: string = this.generateTokenUseCase.execute(user);

        return { userToken };
    }

    public async authenticateToken(token: string): Promise<boolean> {
        if (!token) {
            return false;
        };

        const formatedToken: string = token.replace("Bearer ", "");

        try {
            const tokenPayload = await this.validateTokenUseCase.execute(formatedToken);

            if(!tokenPayload){
                return false;
            }

            return true;
        }
        catch (error) {
            return false;
        }
    }
}

export default new AuthenticationService(
    userRepository,
    generateTokenUseCase,
    checkPasswordIsCorrectUseCase,
    userService,
    validateTokenUseCase
);