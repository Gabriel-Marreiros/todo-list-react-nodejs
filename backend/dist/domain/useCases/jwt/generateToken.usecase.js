"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenUseCase = exports.GenerateTokenUseCase = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class GenerateTokenUseCase {
    constructor() {
        this.privateKey = "provisório";
    }
    execute(user) {
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            name: user.name,
            // profileImage: user.profileImage
        }, this.privateKey);
        return token;
    }
}
exports.GenerateTokenUseCase = GenerateTokenUseCase;
exports.generateTokenUseCase = new GenerateTokenUseCase();
