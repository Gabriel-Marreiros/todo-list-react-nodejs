import { model, Schema } from "mongoose";

const userSchema = new Schema({
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
})

const UserModel = model('User', userSchema);

export default UserModel;