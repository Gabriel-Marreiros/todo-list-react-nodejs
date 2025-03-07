import jsonwebtoken from 'jsonwebtoken';
import { ValidateTokenUseCase } from '../../../src/usecases/jwt/validateToken.usecase';
import { InvalidTokenError } from '../../../src/errors/jwt/InvalidTokenError';

jest.mock('jsonwebtoken');
const validateTokenUseCase = new ValidateTokenUseCase();

describe('ValidateTokenUseCase', () => {
    const mockVerify = jsonwebtoken.verify as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return token payload when the token is valid', () => {
        const token = 'validToken';
        const tokenPayload = { userId: 'userId123', name: 'John Doe' };
        
        mockVerify.mockReturnValue(tokenPayload);
        const result = validateTokenUseCase.execute(token);

        expect(mockVerify).toHaveBeenCalledWith(token, 'provisório');
        expect(result).toEqual(tokenPayload);
    });

    test('should throw InvalidTokenError when the token is invalid', () => {
        const token = 'invalidToken';
        const errorMessage = 'Token inválido';

        mockVerify.mockImplementation(() => {
            throw new Error('Token is invalid');
        }); 

        expect(() => validateTokenUseCase.execute(token)).toThrow(InvalidTokenError);
        expect(() => validateTokenUseCase.execute(token)).toThrow(errorMessage);
    });
});
