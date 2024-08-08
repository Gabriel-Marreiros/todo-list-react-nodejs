import { NextFunction, Request, Response } from 'express';
import { UserController } from '../../../src/application/controllers/user.controller';
import { IUserUpdateRequestDTO } from '../../../src/application/dto/user/IUserUpdateRequestDTO';
import { User } from '../../../src/domain/entities/user.entity';
import { mockUserService } from '../../mocks/services/user.controller.mock.test';

const userController = new UserController(mockUserService);

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
            const userUpdate: IUserUpdateRequestDTO = { name: 'Updated Name' };
            const updatedUser: User = { id: userId, name: 'Updated Name' };

            mockUserService.updateUser.mockResolvedValueOnce(updatedUser);
            mockRequest.params = { userId };
            mockRequest.body = userUpdate;

            const handler = userController.updateUser();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockUserService.updateUser).toHaveBeenCalledWith(userId, userUpdate);
            expect(mockResponse.json).toHaveBeenCalledWith(updatedUser);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em falha no updateUser', async () => {
            const error = new Error('Failed to update user');
            mockUserService.updateUser.mockRejectedValueOnce(error);

            const handler = userController.updateUser();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteUser', () => {
        test('Deve excluir um usuário', async () => {
            const userId = 'testUserId';
            const deletedUser: User = { id: userId, name: 'Deleted User' };

            mockUserService.deleteUser.mockResolvedValueOnce(deletedUser);
            mockRequest.params = { userId };

            const handler = userController.deleteUser();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockUserService.deleteUser).toHaveBeenCalledWith(userId);
            expect(mockResponse.json).toHaveBeenCalledWith(deletedUser);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em deleteUser com falha', async () => {
            const error = new Error('Failed to delete user');
            mockUserService.deleteUser.mockRejectedValueOnce(error);

            const handler = userController.deleteUser();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});
