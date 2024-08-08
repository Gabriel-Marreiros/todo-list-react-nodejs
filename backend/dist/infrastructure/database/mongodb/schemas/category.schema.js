"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.categorySchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
});
const CategoryModel = (0, mongoose_1.model)('Category', exports.categorySchema);
exports.default = CategoryModel;
