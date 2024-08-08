import { Document } from "mongoose";

export interface IUserRepository {
    getUserById(userId: string): Promise<Document | null>;
    createUser(user: any): Promise<Document>;
    updateUser(userId: string, userUpdate: any): Promise<Document | null>;
    deleteUser(userId: string): Promise<Document | null>;
    getUserByEmail(email: string): Promise<Document | null>;
}