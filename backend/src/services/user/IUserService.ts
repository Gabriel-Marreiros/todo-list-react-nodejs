import { User } from "../../entities/user.entity";

export interface IUserService {
    createUser(user: User): Promise<User>
    updateUser(userId: string, userUpdate: any): Promise<any>;
    deleteUser(userId: string): Promise<any>;
}