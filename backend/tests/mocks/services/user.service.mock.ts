import { IUserService } from "../../../src/services/user/IUserService";

export const userServiceMock: jest.Mocked<IUserService> = {
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn()
};