"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenUseCase = exports.ValidateTokenUseCase = void 0;
const InvalidTokenError_1 = require("../../errors/jwt/InvalidTokenError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ValidateTokenUseCase {
    constructor() {
        this.secret = "provisório";
    }
    execute(token) {
        try {
            const tokenPayload = jsonwebtoken_1.default.verify(token, this.secret);
            return tokenPayload;
        }
        catch (error) {
            throw new InvalidTokenError_1.InvalidTokenError("Token inválido", "O token enviado é inválido.", 404);
        }
    }
}
exports.ValidateTokenUseCase = ValidateTokenUseCase;
exports.validateTokenUseCase = new ValidateTokenUseCase();
