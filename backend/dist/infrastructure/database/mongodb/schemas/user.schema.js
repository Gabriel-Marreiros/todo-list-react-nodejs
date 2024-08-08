"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: "O preenchimento do nome da categoria é obrigatório."
    },
    email: {
        type: String,
        require: "O preenchimento ddo e-mail é obrigatório."
    },
    password: {
        type: String,
        require: "O preenchimento da senha é obrigatório."
    },
    profileImage: {
        type: Buffer,
        require: false
    }
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
