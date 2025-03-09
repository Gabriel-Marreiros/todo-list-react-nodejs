import { IUser } from "./IUser";

export interface IRegisterUserResponse {
    token: string;
    createdUser: IUser;
} 