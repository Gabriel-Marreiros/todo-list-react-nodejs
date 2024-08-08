"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotExistsError = void 0;
class UserNotExistsError extends Error {
    constructor(title, message, status) {
        super();
        this.instance = "";
        this.title = title;
        this.message = message;
        this.status = status;
    }
}
exports.UserNotExistsError = UserNotExistsError;
