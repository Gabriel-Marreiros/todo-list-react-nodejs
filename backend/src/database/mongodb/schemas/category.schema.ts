import { model, Schema } from "mongoose";

export const categorySchema = new Schema({
    name: {
        type: String,
        require: "O preenchimento do nome da categoria é obrigatório."
    },

    backgroundColor: {
        type: String,
        require: "O escolha de uma cor defundo é obrigatória."
    },

    textColor: {
        type: String,
        require: "O escolha de uma cor de texto é obrigatória."
    },

    user: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
})

const CategoryModel = model('Category', categorySchema);

export default CategoryModel;