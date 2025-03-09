import jsonWebToken from 'jsonwebtoken';
import { User } from '../../../src/entities/user.entity';
import { GenerateTokenUseCase } from '../../../src/usecases/jwt/generateToken.usecase';

jest.mock('jsonwebtoken');
const generateTokenUseCase = new GenerateTokenUseCase();

describe('GenerateTokenUseCase', () => {
    const mockSign = jsonWebToken.sign as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should generate a JWT token for the given user', () => {
        const user: User = {
            id: 'userId123',
            name: 'John Doe',
            email: 'email-test@email.com',
            password: 'testepassword',
        };

        const expectedToken = 'mockToken';
        mockSign.mockReturnValue(expectedToken);

        const token = generateTokenUseCase.execute(user);

        expect(mockSign).toHaveBeenCalledWith(
            {
                userId: user.id,
                name: user.name,
            },
            'provisório'
        );
        expect(token).toBe(expectedToken);
    });
});
