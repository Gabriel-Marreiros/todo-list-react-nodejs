export interface ICategoryModel {
    _id: string;
    name: string;
    backgroundColor: string;
    textColor: string;
    user: string;
}

export class Category {
    public id: string;
    public name: string;
    public backgroundColor: string;
    public textColor: string;

    private constructor(categoryModel: ICategoryModel){
        this.id = categoryModel._id;
        this.name = categoryModel.name;
        this.backgroundColor = categoryModel.backgroundColor;
        this.textColor = categoryModel.textColor;
    }

    public static with(categoryModel: ICategoryModel): Category {
        return new Category(categoryModel);
    }
}