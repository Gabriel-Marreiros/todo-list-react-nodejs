import { User } from "../../entities/user.entity";

export interface IRegisterUserResponseDTO {
    token: string;
    createdUser: User;
} 