import { UserServiceImpl } from './../services/user/user.service';
import { GenerateTokenUseCase, generateTokenUseCase } from '../usecases/jwt/generateToken.usecase';
import { NextFunction, Request, RequestHandler, Response } from "express";
import { IUserService } from "../services/user/IUserService";
import { IUserUpdateRequestDTO } from "../dto/user/IUserUpdateRequestDTO";
import { User } from "../entities/user.entity";
import { IRegisterUserResponseDTO } from "../dto/user/IRegisterUserResponseDTO";

export class UserController {

    constructor(
        private userService: IUserService,
        private generateTokenUseCase: GenerateTokenUseCase,
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

                response.json(registerUserResponse).status(201);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public updateUser(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.params.userId;
                const userUpdate: IUserUpdateRequestDTO = request.body;

                const updatedUser = await this.userService.updateUser(userId, userUpdate);

                response.json(updatedUser).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public deleteUser(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.params.userId;

                const deletedUser: User = await this.userService.deleteUser(userId);

                response.json(deletedUser).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

}

export default new UserController(
    UserServiceImpl,
    generateTokenUseCase
);