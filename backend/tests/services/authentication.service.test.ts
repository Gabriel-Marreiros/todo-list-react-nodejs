import { AuthenticationService } from "../../src/services/authentication/authentication.service";
import { GenerateTokenUseCase } from "../../src/usecases/jwt/generateToken.usecase";
import { ValidateTokenUseCase } from "../../src/usecases/jwt/validateToken.usecase";
import { CheckPasswordIsCorrectUseCase } from "../../src/usecases/user/checkPasswordIsCorrect.usecase";
import { userRepositoryMock } from "../mocks/repositories/user.repository.mock";
import { userServiceMock } from "../mocks/services/user.service.mock";

const generateTokenUseCaseMock: jest.Mocked<GenerateTokenUseCase> = {
    execute: jest.fn(),
};

const validateTokenUseCaseMock: jest.Mocked<ValidateTokenUseCase> = {
    execute: jest.fn(),
};

const mockCheckPasswordIsCorrectUseCase: jest.Mocked<CheckPasswordIsCorrectUseCase> = {
    execute: jest.fn(),
};

const authenticationService = new AuthenticationService(
    userRepositoryMock,
    generateTokenUseCaseMock,
    mockCheckPasswordIsCorrectUseCase,
    userServiceMock,
    validateTokenUseCaseMock
);

describe('AuthenticationService', () => {
    describe('registerUser', () => {
        test('should register a user and return a token', async () => {
            const userData: User = { id: '1', name: 'Test User', email: 'test@example.com', password: 'password' };
            const createdUser: User = { ...userData };
            const token = 'fakeToken';

            userServiceMock.createUser.mockResolvedValueOnce(createdUser);
            generateTokenUseCaseMock.execute.mockReturnValueOnce(token);

            const result: IRegisterUserResponseDTO = await authenticationService.registerUser(userData);

            expect(userServiceMock.createUser).toHaveBeenCalledWith(userData);
            expect(generateTokenUseCaseMock.execute).toHaveBeenCalledWith(createdUser);
            expect(result).toEqual({ token, createdUser });
        });

        test('should throw an error if user creation fails', async () => {
            const userData: User = { id: '1', name: 'Test User', email: 'test@example.com', password: 'password' };

            userServiceMock.createUser.mockRejectedValueOnce(new Error('Failed to create user'));

            await expect(authenticationService.registerUser(userData)).rejects.toThrow('Failed to create user');
        });
    });

    describe('login', () => {
        test('should return a token for valid credentials', async () => {
            const loginData: ILoginRequestDTO = { email: 'test@example.com', password: 'password' };
            const user = new User({ id: '1', email: loginData.email, password: 'hashedPassword' });
            const token = 'fakeToken';

            userRepositoryMock.getUserByEmail.mockResolvedValueOnce(user);
            mockCheckPasswordIsCorrectUseCase.execute.mockResolvedValueOnce(true);
            generateTokenUseCaseMock.execute.mockReturnValueOnce(token);

            const result = await authenticationService.login(loginData);

            expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(loginData.email);
            expect(mockCheckPasswordIsCorrectUseCase.execute).toHaveBeenCalledWith({
                inputPassword: loginData.password,
                userPassword: user.password
            });
            expect(generateTokenUseCaseMock.execute).toHaveBeenCalledWith(user);
            expect(result).toEqual({ userToken: token });
        });

        test('should throw an error for invalid credentials', async () => {
            const loginData: ILoginRequestDTO = { email: 'test@example.com', password: 'wrongPassword' };

            userRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);

            await expect(authenticationService.login(loginData)).rejects.toThrow('Usuário ou senha incorretos.');
        });

        test('should throw an error if password is incorrect', async () => {
            const loginData: ILoginRequestDTO = { email: 'test@example.com', password: 'wrongPassword' };
            const user = new User({ id: '1', email: loginData.email, password: 'hashedPassword' });

            userRepositoryMock.getUserByEmail.mockResolvedValueOnce(user);
            mockCheckPasswordIsCorrectUseCase.execute.mockResolvedValueOnce(false);

            await expect(authenticationService.login(loginData)).rejects.toThrow('Usuário ou senha incorretos.');
        });
    });

    describe('authenticateToken', () => {
        test('should return true for a valid token', async () => {
            const token = 'Bearer validToken';
            const tokenPayload = { userId: '1' };

            validateTokenUseCaseMock.execute.mockResolvedValueOnce(tokenPayload);

            const result = await authenticationService.authenticateToken(token);

            expect(validateTokenUseCaseMock.execute).toHaveBeenCalledWith('validToken');
            expect(result).toBe(true);
        });

        test('should return false for an invalid token', async () => {
            const token = 'Bearer invalidToken';

            validateTokenUseCaseMock.execute.mockResolvedValueOnce(null);

            const result = await authenticationService.authenticateToken(token);

            expect(validateTokenUseCaseMock.execute).toHaveBeenCalledWith('invalidToken');
            expect(result).toBe(false);
        });

        test('should return false if token validation throws an error', async () => {
            const token = 'Bearer tokenThatFailsValidation';

            validateTokenUseCaseMock.execute.mockRejectedValueOnce(new Error('Validation error'));

            const result = await authenticationService.authenticateToken(token);

            expect(result).toBe(false);
        });
    });
});
