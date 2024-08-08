import { User } from "../../../domain/entities/user.entity";
import { IRegisterUserResponseDTO } from "../../dto/user/IRegisterUserResponseDTO";


export interface IAuthenticationService {
    login(loginData: any): Promise<{userToken: string}>;
    registerUser(userData: User): Promise<IRegisterUserResponseDTO>;
    authenticateToken(token: string): Promise<boolean>;
}