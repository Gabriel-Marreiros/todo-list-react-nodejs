import { IUserRepository } from "../../../src/repositories/user/IUserRepository";

export const userRepositoryMock: jest.Mocked<IUserRepository> = {
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    getUserByEmail: jest.fn(),
};