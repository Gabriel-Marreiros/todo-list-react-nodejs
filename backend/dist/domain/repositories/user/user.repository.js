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
const user_schema_1 = __importDefault(require("../../../infrastructure/database/mongodb/schemas/user.schema"));
class UserRepository {
    constructor() { }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield user_schema_1.default.findById(userId);
            return response;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield user_schema_1.default.findOne({ email });
            return response;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield user_schema_1.default.create(user);
            return response;
        });
    }
    updateUser(userId, userUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield user_schema_1.default.findByIdAndUpdate(userId, userUpdate);
            return response;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield user_schema_1.default.findByIdAndDelete(userId);
            return deletedUser;
        });
    }
}
exports.default = new UserRepository();
