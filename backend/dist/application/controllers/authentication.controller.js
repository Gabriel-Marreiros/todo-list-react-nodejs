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
exports.AuthenticationController = void 0;
const authentication_service_1 = __importDefault(require("../services/authentication/authentication.service"));
class AuthenticationController {
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    login() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const loginData = request.body;
                const userToken = yield this.authenticationService.login(loginData);
                response.json(userToken).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    registerUser() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = request.body;
                const serviceResponse = yield this.authenticationService.registerUser(user);
                response.json(serviceResponse).status(201).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    authenticateToken() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = request.body.token;
                const serviceResponse = yield this.authenticationService.authenticateToken(token);
                response.json(serviceResponse).status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthenticationController = AuthenticationController;
exports.default = new AuthenticationController(authentication_service_1.default);
