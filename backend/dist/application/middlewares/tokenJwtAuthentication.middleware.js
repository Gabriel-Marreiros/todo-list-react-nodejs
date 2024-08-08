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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenJwtAuthenticationMiddleware = void 0;
const validateToken_usecase_1 = require("../../domain/useCases/jwt/validateToken.usecase");
const noTokenJwtError_1 = require("../../domain/errors/jwt/noTokenJwtError");
class TokenJwtAuthenticationMiddleware {
    constructor(validateTokenUseCase) {
        this.validateTokenUseCase = validateTokenUseCase;
    }
    handle() {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authorizationHeader = request.header("Authorization");
                if (!authorizationHeader) {
                    throw new noTokenJwtError_1.NoTokenJwtError("Sem token JWT.", "Sem token de acesso.", 401);
                }
                ;
                const token = authorizationHeader.replace("Bearer ", "");
                const tokenPayload = yield this.validateTokenUseCase.execute(token);
                console.log(tokenPayload.userId);
                request.headers["user-id"] = tokenPayload.userId;
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
;
exports.tokenJwtAuthenticationMiddleware = new TokenJwtAuthenticationMiddleware(validateToken_usecase_1.validateTokenUseCase);
