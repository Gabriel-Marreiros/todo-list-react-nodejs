import { model, Schema, Types } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        require: "O preenchimento do titulo é obrigatório."
    },

    description: {
        type: String,
        require: "O preenchimento da descrição é obrigatório."
    },

    category: {
        type: Schema.Types.ObjectId,
        require: false,
        ref: 'Category'
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
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
})

const TaskModel = model('Task', taskSchema);

export default TaskModel;