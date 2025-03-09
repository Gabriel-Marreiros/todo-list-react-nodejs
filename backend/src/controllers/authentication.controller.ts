import { UserServiceImpl } from './../services/user/user.service';
import { AuthenticationServiceImpl } from './../services/authentication/authentication.service';
import { NextFunction, Request, RequestHandler, Response } from "express";
import { ILoginRequestDTO } from "../dto/auth/ILoginRequestDTO";
import { IAuthenticationService } from "../services/authentication/IAuthenticationService";
import { generateTokenUseCase, GenerateTokenUseCase } from "../usecases/jwt/generateToken.usecase";
import { User } from "../entities/user.entity";
import { IRegisterUserResponseDTO } from "../dto/user/IRegisterUserResponseDTO";
import { IKafkaService } from "../services/kafka/IKafkaService";
import { KafkaServiceImpl } from "../services/kafka/kafka.service";
import { IUserService } from '../services/user/IUserService';

export class AuthenticationController {

    constructor(
        private authenticationService: IAuthenticationService,
        private userService: IUserService,
        private generateTokenUseCase: GenerateTokenUseCase,
        private kafkaService: IKafkaService
    ) { }

    public registerUser(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const user = request.body;

                const createdUser: User = await this.userService.createUser(user);

                const token: string = this.generateTokenUseCase.execute(createdUser);

                const registerUserResponse: IRegisterUserResponseDTO = {
                    token,
                    createdUser
                }

                const kafkaMessage = {
                    userEmail: createdUser.email, 
                    userName: createdUser.name
                };
                
                this.kafkaService.produceMessage("welcome-notification-topic", kafkaMessage);
                
                response.json(registerUserResponse).status(201);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public login(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const loginData: ILoginRequestDTO = request.body;

                const userToken: string = await this.authenticationService.login(loginData);

                response.json(userToken).status(200);
            }
            catch (error) {
                next(error)
            }
        }

    }

    public authenticateToken(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const token: string = request.body.token;

                const serviceResponse: boolean = await this.authenticationService.authenticateToken(token);

                response.json(serviceResponse).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

}

export default new AuthenticationController(
    AuthenticationServiceImpl,
    UserServiceImpl,
    generateTokenUseCase,
    KafkaServiceImpl
);