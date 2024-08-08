"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: "O preenchimento do titulo é obrigatório."
    },
    description: {
        type: String,
        require: "O preenchimento da descrição é obrigatório."
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: false,
        ref: 'Category',
        select: true
    },
    recurrent: {
        type: Boolean,
        require: false,
        default: false
    },
    startDateTime: {
        type: Date,
        require: false,
    },
    endDateTime: {
        type: Date,
        require: false,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
});
const TaskModel = (0, mongoose_1.model)('Task', taskSchema);
exports.default = TaskModel;
