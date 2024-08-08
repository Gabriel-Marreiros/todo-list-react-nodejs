import { User } from "../../../domain/entities/user.entity";

export interface IRegisterUserResponseDTO {
    token: string;
    createdUser: User;
} 