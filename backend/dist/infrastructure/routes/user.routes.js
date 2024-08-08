"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../application/controllers/user.controller"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
// userRouter.post("/", userController.createUser());
userRouter.put("/", user_controller_1.default.updateUser());
userRouter.delete("/", user_controller_1.default.deleteUser());
