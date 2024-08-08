"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    // public profileImage: Buffer
    constructor(userModel) {
        this.id = userModel._id;
        this.name = userModel.name;
        this.email = userModel.email;
        this.password = userModel.password;
        // this.profileImage = userModel.profileImage;
    }
    static with(userModel) {
        return new User(userModel);
    }
}
exports.User = User;
