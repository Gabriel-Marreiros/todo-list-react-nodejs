import { NextFunction, Request, RequestHandler, Response } from "express";
import { IUserService } from "../services/user/IUserService";
import userService from "../services/user/user.service";
import { IUserUpdateRequestDTO } from "../dto/user/IUserUpdateRequestDTO";
import { User } from "../../domain/entities/user.entity";

export class UserController {

    constructor(
        private userService: IUserService
    ) { }

    public updateUser(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.params.userId;
                const userUpdate: IUserUpdateRequestDTO = request.body;

                const updatedUser = await this.userService.updateUser(userId, userUpdate);

                response.json(updatedUser).status(200).send();
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

                response.json(deletedUser).status(200).send();
            }
            catch (error) {
                next(error)
            }
        }
    }

}

export default new UserController(userService);