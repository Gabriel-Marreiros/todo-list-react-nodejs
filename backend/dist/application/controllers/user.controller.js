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
exports.UserController = void 0;
const user_service_1 = __importDefault(require("../services/user/user.service"));
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    updateUser() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.params.userId;
                const userUpdate = request.body;
                const updatedUser = yield this.userService.updateUser(userId, userUpdate);
                response.json(updatedUser).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteUser() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.params.userId;
                const deletedUser = yield this.userService.deleteUser(userId);
                response.json(deletedUser).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
exports.default = new UserController(user_service_1.default);
