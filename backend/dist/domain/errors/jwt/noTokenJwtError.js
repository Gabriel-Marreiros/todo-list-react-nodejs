"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoTokenJwtError = void 0;
class NoTokenJwtError extends Error {
    constructor(title, message, status) {
        super();
        this.instance = "";
        this.title = title;
        this.message = message;
        this.status = status;
    }
}
exports.NoTokenJwtError = NoTokenJwtError;
