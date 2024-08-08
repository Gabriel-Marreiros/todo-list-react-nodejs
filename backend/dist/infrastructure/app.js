"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const tokenJwtAuthentication_middleware_1 = require("../application/middlewares/tokenJwtAuthentication.middleware");
const errorHandler_1 = require("./errorHandler");
const authentication_routes_1 = require("./routes/authentication.routes");
const category_routes_1 = require("./routes/category.routes");
const task_routes_1 = require("./routes/task.routes");
const user_routes_1 = require("./routes/user.routes");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorsHandler();
    }
    initMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(["/categories", "/users", "/tasks"], tokenJwtAuthentication_middleware_1.tokenJwtAuthenticationMiddleware.handle());
    }
    initRoutes() {
        this.app.use("/auth", authentication_routes_1.authenticationRouter);
        this.app.use("/tasks", task_routes_1.taskRouter);
        this.app.use("/categories", category_routes_1.categoryRouter);
        this.app.use("/users", user_routes_1.userRouter);
    }
    ;
    initErrorsHandler() {
        this.app.use(errorHandler_1.errorHandler);
    }
    start(port, callback) {
        this.app.listen(port, callback);
    }
}
exports.App = App;
