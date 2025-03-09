import { Document } from "mongoose";
import { IUserRepository } from "./IUserRepository";
import UserModel from "../../database/mongodb/schemas/user.schema";

class UserRepository implements IUserRepository {

    constructor(){}

    public async getUserById(userId: string): Promise<Document | null> {
        const response: Document | null = await UserModel.findById(userId);

        return response;
    }

    public async getUserByEmail(email: string): Promise<Document | null> {
        const response: Document | null = await UserModel.findOne({email});

        return response;
    }

    public async createUser(user: any): Promise<Document> {
        const response: Document = await UserModel.create(user);

        return response;
    }

    public async updateUser(userId: string, userUpdate: any): Promise<Document | null> {
        const response: Document | null = await UserModel.findByIdAndUpdate(userId, userUpdate);

        return response;
    }

    public async deleteUser(userId: string): Promise<Document | null> {
        const deletedUser: Document | null = await UserModel.findByIdAndDelete(userId);

        return deletedUser;
    }

}

export default new UserRepository();