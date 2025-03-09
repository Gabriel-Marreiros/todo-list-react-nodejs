import { NextFunction, Request, Response } from 'express';
import { UserController } from '../../src/controllers/user.controller';
import { IUserUpdateRequestDTO } from '../../src/dto/user/IUserUpdateRequestDTO';
import { User } from '../../src/entities/user.entity';
import { userServiceMock } from '../mocks/services/user.service.mock';
import { userMock } from '../mocks/entities/user.mock';

const userController = new UserController(userServiceMock);

describe('UserController', () => {
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

    describe('updateUser', () => {
        test('Deve atualizar um usuário', async () => {
            const userId = 'testUserId';
            const userUpdate: IUserUpdateRequestDTO = userMock;
            const updatedUser: User = userMock;

            userServiceMock.updateUser.mockResolvedValueOnce(updatedUser);
            mockRequest.params = { userId };
            mockRequest.body = userUpdate;

            const handler = userController.updateUser();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(userServiceMock.updateUser).toHaveBeenCalledWith(userId, userUpdate);
            expect(mockResponse.json).toHaveBeenCalledWith(updatedUser);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em falha no updateUser', async () => {
            const userId = 'testUserId';
            mockRequest.params = { userId };

            const error = new Error('Failed to update user');
            userServiceMock.updateUser.mockRejectedValueOnce(error);

            const handler = userController.updateUser();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteUser', () => {
        test('Deve excluir um usuário', async () => {
            const userId = 'testUserId';
            const deletedUser: User = userMock;

            userServiceMock.deleteUser.mockResolvedValueOnce(deletedUser);
            mockRequest.params = { userId };

            const handler = userController.deleteUser();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(userServiceMock.deleteUser).toHaveBeenCalledWith(userId);
            expect(mockResponse.json).toHaveBeenCalledWith(deletedUser);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em deleteUser com falha', async () => {
            const userId = 'testUserId';
            mockRequest.params = { userId }

            const error = new Error('Failed to delete user');
            userServiceMock.deleteUser.mockRejectedValueOnce(error);

            const handler = userController.deleteUser();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});
