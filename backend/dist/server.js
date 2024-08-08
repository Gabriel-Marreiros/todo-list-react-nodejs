"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./infrastructure/app");
const mongoDbConnection_1 = require("./infrastructure/database/mongodb/mongoDbConnection");
"mongodb://root:Zxcasdqwe123$@localhost:27017/todo-list-react-nodejs?authSource=admin";
const app = new app_1.App();
const mongoDBConnection = new mongoDbConnection_1.MongoDBConnection("localhost:27017", "root", "Zxcasdqwe123$", "todo-list-react-nodejs");
mongoDBConnection.connect();
app.start(8080, () => {
    console.log("servidor funcionando");
});
