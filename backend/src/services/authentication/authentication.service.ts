
import { User } from "../../entities/user.entity";
import { IncorrectUserOrPasswordError } from "../../errors/authentication/IncorrectUserOrPasswordError";
import { IUserRepository } from "../../repositories/user/IUserRepository";
import userRepository from "../../repositories/user/user.repository";
import { generateTokenUseCase, GenerateTokenUseCase } from "../../usecases/jwt/generateToken.usecase";
import { validateTokenUseCase, ValidateTokenUseCase } from "../../usecases/jwt/validateToken.usecase";
import { checkPasswordIsCorrectUseCase, CheckPasswordIsCorrectUseCase } from "../../usecases/user/checkPasswordIsCorrect.usecase";
import { ILoginRequestDTO } from "../../dto/auth/ILoginRequestDTO";
import { IAuthenticationService } from "./IAuthenticationService";

export class AuthenticationService implements IAuthenticationService {

    constructor(
        private userRepository: IUserRepository,
        private generateTokenUseCase: GenerateTokenUseCase,
        private checkPasswordIsCorrectUseCase: CheckPasswordIsCorrectUseCase,
        private validateTokenUseCase: ValidateTokenUseCase
    ) { }

    public async login(loginData: ILoginRequestDTO): Promise<string> {
        const response = await this.userRepository.getUserByEmail(loginData.email);

        if (!response) {
            throw new IncorrectUserOrPasswordError(
                "Usuário ou senha incorretos.",
                "O usuário ou senha fornecidos estão incorretos!",
                401
            );
        }

        const user: User = User.with(response.toJSON());

        const passwordIsCorrect: boolean = await this.checkPasswordIsCorrectUseCase.execute({
            inputPassword: loginData.password,
            userPassword: user.password
        });

        if (!passwordIsCorrect) {
            throw new IncorrectUserOrPasswordError(
                "Usuário ou senha incorretos.",
                "O usuário ou senha fornecidos estão incorretos!",
                401
            );
        }

        const userToken: string = this.generateTokenUseCase.execute(user);

        return userToken;
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

export const AuthenticationServiceImpl = new AuthenticationService(
    userRepository,
    generateTokenUseCase,
    checkPasswordIsCorrectUseCase,
    validateTokenUseCase
);