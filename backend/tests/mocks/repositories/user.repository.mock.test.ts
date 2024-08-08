import { IUserService } from "../../../src/application/services/user/IUserService";
import { IUserRepository } from "../../../src/domain/repositories/user/IUserRepository";

export const mockUserRepository: jest.Mocked<IUserRepository> = {
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    getUserByEmail: jest.fn(),
};