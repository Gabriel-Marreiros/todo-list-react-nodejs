import { IUserService } from "../../../src/application/services/user/IUserService";

export const mockUserService: jest.Mocked<IUserService> = {
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
};