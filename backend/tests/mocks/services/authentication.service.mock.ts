import { IAuthenticationService } from "../../../src/services/authentication/IAuthenticationService";

export const authenticationServiceMock: jest.Mocked<IAuthenticationService> = {
    login: jest.fn(),
    authenticateToken: jest.fn(),
};