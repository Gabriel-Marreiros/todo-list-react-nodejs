import { NextFunction, Request, RequestHandler, Response } from "express";
import { IAuthenticationService } from "../services/authentication/IAuthenticationService";
import authenticationService from "../services/authentication/authentication.service";
import { ILoginRequestDTO } from "../dto/auth/ILoginRequestDTO";
import { IRegisterUserResponseDTO } from "../dto/user/IRegisterUserResponseDTO";
import { rabbitMQService, RabbitMQService } from "../services/rabbitmq/rabbitmq.service";

export class AuthenticationController {

    constructor(
        private authenticationService: IAuthenticationService,
        private rabbitMQService: RabbitMQService
    ) { }
    
    public registerUser(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const user = request.body;

                const serviceResponse: IRegisterUserResponseDTO = await this.authenticationService.registerUser(user);

                this.rabbitMQService.publishEmailNotificationMessage({message: "Mensagem enviada para o usuário ao se cadastrar."})

                response.json(serviceResponse).status(201).send();

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

                const userToken = await this.authenticationService.login(loginData);

                response.json(userToken).status(200).send();

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

                const serviceResponse = await this.authenticationService.authenticateToken(token);

                response.json(serviceResponse).status(200).send();

            }
            catch (error) {
                next(error)
            }
        }
    }

}

export default new AuthenticationController(
    authenticationService,
    rabbitMQService
);