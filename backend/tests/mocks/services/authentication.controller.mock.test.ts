import { IAuthenticationService } from "../../../src/application/services/authentication/IAuthenticationService";

export const authenticationServiceMock: jest.Mocked<IAuthenticationService> = {
    login: jest.fn(),
    registerUser: jest.fn(),
    authenticateToken: jest.fn(),
};