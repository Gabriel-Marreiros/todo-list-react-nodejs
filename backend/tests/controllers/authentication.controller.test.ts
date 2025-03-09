import { NextFunction, Request, Response } from 'express';
import { AuthenticationController } from '../../src/controllers/authentication.controller';
import { ILoginRequestDTO } from '../../src/dto/auth/ILoginRequestDTO';
import { IRegisterUserResponseDTO } from '../../src/dto/user/IRegisterUserResponseDTO';
import { userMock } from '../mocks/entities/user.mock';
import { authenticationServiceMock } from '../mocks/services/authentication.service.mock';
import { kafkaServiceMock } from '../mocks/services/kafka.service.mock';


const authenticationController = new AuthenticationController(

);

describe('Authentication Controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: Partial<NextFunction>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn();
    });

    describe('login', () => {
        test('Deve retornar o token do usuário no login bem-sucedido', async () => {
            const userToken = { userToken: 'testToken' };
            const loginData: ILoginRequestDTO = { email: 'test@example.com', password: 'password' };

            authenticationServiceMock.login.mockResolvedValueOnce(userToken);
            mockRequest.body = loginData;

            const handler = authenticationController.login();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(authenticationServiceMock.login).toHaveBeenCalledWith(loginData);
            expect(mockResponse.json).toHaveBeenCalledWith(userToken);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.send).toHaveBeenCalled();
        });

        test('Deve ligar em seguida com erro em caso de falha no login', async () => {
            const error = new Error('Login failed');
            authenticationServiceMock.login.mockRejectedValueOnce(error);

            const handler = authenticationController.login();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('registerUser', () => {
        test('Deve retornar a resposta do serviço no registro bem-sucedido', async () => {
            const serviceResponse: IRegisterUserResponseDTO = { 
                token: "testeToken",
                createdUser: userMock
            };
            const userData = { email: 'test@example.com', password: 'password' };

            authenticationServiceMock.registerUser.mockResolvedValueOnce(serviceResponse);
            mockRequest.body = userData;

            const handler = authenticationController.registerUser();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(authenticationServiceMock.registerUser).toHaveBeenCalledWith(userData);
            expect(mockResponse.json).toHaveBeenCalledWith(serviceResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
        });

        test('Deve ligar em seguida com erro no registro com falha', async () => {
            const error = new Error('Registration failed');
            authenticationServiceMock.registerUser.mockRejectedValueOnce(error);

            const handler = authenticationController.registerUser();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('authenticateToken', () => {
        test('Deve retornar a resposta do serviço na autenticação de token bem-sucedida', async () => {
            const token = 'testToken';

            authenticationServiceMock.authenticateToken.mockResolvedValueOnce(true);
            mockRequest.body = { token };

            const handler = authenticationController.authenticateToken();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(authenticationServiceMock.authenticateToken).toHaveBeenCalledWith(token);
            expect(mockResponse.json).toHaveBeenCalledWith(true);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve ligar em seguida com erro na falha na autenticação do token', async () => {
            const error = new Error('Token authentication failed');
            authenticationServiceMock.authenticateToken.mockRejectedValueOnce(error);

            const handler = authenticationController.authenticateToken();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});
