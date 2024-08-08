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
exports.UserService = void 0;
const user_entity_1 = require("../../../domain/entities/user.entity");
const UserAlreadyExistsError_1 = require("../../../domain/errors/user/UserAlreadyExistsError");
const UserNotExistsError_1 = require("../../../domain/errors/user/UserNotExistsError");
const user_repository_1 = __importDefault(require("../../../domain/repositories/user/user.repository"));
const checkUserAlreadyExists_usecase_1 = __importDefault(require("../../../domain/useCases/user/checkUserAlreadyExists.usecase"));
const checkUserAlreadyExistsById_usecase_1 = require("../../../domain/useCases/user/checkUserAlreadyExistsById.usecase");
const encryptUserPassword_usecase_1 = require("../../../domain/useCases/user/encryptUserPassword.usecase");
class UserService {
    constructor(userRepository, checkUserAlreadyExistsUseCase, checkUserAlreadyExistsByIdUseCase, encryptUserPasswordUseCase) {
        this.userRepository = userRepository;
        this.checkUserAlreadyExistsUseCase = checkUserAlreadyExistsUseCase;
        this.checkUserAlreadyExistsByIdUseCase = checkUserAlreadyExistsByIdUseCase;
        this.encryptUserPasswordUseCase = encryptUserPasswordUseCase;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAlreadyExists = yield this.checkUserAlreadyExistsUseCase.execute(user.email);
            if (userAlreadyExists) {
                throw new UserAlreadyExistsError_1.UserAlreadyExistsError("Usuário já existe.", "Já existe um usuário com este e-mail.", 400);
            }
            user.password = yield this.encryptUserPasswordUseCase.execute(user.password);
            const response = yield this.userRepository.createUser(user);
            const createdUser = user_entity_1.User.with(response.toJSON());
            return createdUser;
        });
    }
    updateUser(userId, userUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this.checkUserAlreadyExistsByIdUseCase.execute(userId);
            if (!userExists) {
                throw new UserNotExistsError_1.UserNotExistsError("Usuário não existe.", "O usuário solicitado não existe.", 400);
            }
            const response = yield this.userRepository.updateUser(userId, userUpdate);
            const updatedUser = user_entity_1.User.with(response.toJSON());
            return updatedUser;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this.checkUserAlreadyExistsByIdUseCase.execute(userId);
            if (!userExists) {
                throw new UserNotExistsError_1.UserNotExistsError("Usuário não existe.", "O usuário solicitado não existe.", 400);
            }
            const response = yield this.userRepository.deleteUser(userId);
            const deletedUser = user_entity_1.User.with(response.toJSON());
            return deletedUser;
        });
    }
}
exports.UserService = UserService;
exports.default = new UserService(user_repository_1.default, checkUserAlreadyExists_usecase_1.default, checkUserAlreadyExistsById_usecase_1.checkUserAlreadyExistsByIdUseCase, encryptUserPassword_usecase_1.encryptUserPasswordUseCase);
