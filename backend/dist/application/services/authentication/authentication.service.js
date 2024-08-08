"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const user_entity_1 = require("../../../domain/entities/user.entity");
const user_repository_1 = __importDefault(require("../../../domain/repositories/user/user.repository"));
const generateToken_usecase_1 = require("../../../domain/useCases/jwt/generateToken.usecase");
const validateToken_usecase_1 = require("../../../domain/useCases/jwt/validateToken.usecase");
const checkPasswordIsCorrect_usecase_1 = require("../../../domain/useCases/user/checkPasswordIsCorrect.usecase");
const user_service_1 = __importDefault(require("../user/user.service"));
class AuthenticationService {
    constructor(userRepository, generateTokenUseCase, checkPasswordIsCorrectUseCase, userService, validateTokenUseCase) {
        this.userRepository = userRepository;
        this.generateTokenUseCase = generateTokenUseCase;
        this.checkPasswordIsCorrectUseCase = checkPasswordIsCorrectUseCase;
        this.userService = userService;
        this.validateTokenUseCase = validateTokenUseCase;
    }
    registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield this.userService.createUser(userData);
            const token = this.generateTokenUseCase.execute(createdUser);
            const response = {
                token,
                createdUser
            };
            return response;
        });
    }
    login(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.userRepository.getUserByEmail(loginData.email);
            if (!response) {
                throw new Error("Usuário ou senha incorretos.");
            }
            const user = user_entity_1.User.with(response.toJSON());
            const passwordIsCorrect = yield this.checkPasswordIsCorrectUseCase.execute({
                inputPassword: loginData.password,
                userPassword: user.password
            });
            if (!passwordIsCorrect) {
                throw new Error("Usuário ou senha incorretos.");
            }
            const userToken = this.generateTokenUseCase.execute(user);
            return { userToken };
        });
    }
    authenticateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                return false;
            }
            ;
            const formatedToken = token.replace("Bearer ", "");
            try {
                const tokenPayload = yield this.validateTokenUseCase.execute(formatedToken);
                if (!tokenPayload) {
                    return false;
                }
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.AuthenticationService = AuthenticationService;
exports.default = new AuthenticationService(user_repository_1.default, generateToken_usecase_1.generateTokenUseCase, checkPasswordIsCorrect_usecase_1.checkPasswordIsCorrectUseCase, user_service_1.default, validateToken_usecase_1.validateTokenUseCase);
