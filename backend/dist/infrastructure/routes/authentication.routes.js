"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
const express_1 = require("express");
const authentication_controller_1 = __importDefault(require("../../application/controllers/authentication.controller"));
const authenticationRouter = (0, express_1.Router)();
exports.authenticationRouter = authenticationRouter;
authenticationRouter.post("/login", authentication_controller_1.default.login());
authenticationRouter.post("/authenticate-token", authentication_controller_1.default.authenticateToken());
authenticationRouter.post("/register", authentication_controller_1.default.registerUser());
