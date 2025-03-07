export interface IUserModel {
    _id: string;
    name: string;
    email: string;
    password: string;
    profileImage: Buffer;
}

export class User {
    public id: string;
    public name: string;
    public email: string;
    public password: string;
    public profileImage: Buffer

    private constructor(userModel: IUserModel) {
        this.id = userModel._id;
        this.name = userModel.name;
        this.email = userModel.email;
        this.password = userModel.password;
        this.profileImage = userModel.profileImage;
    }

    public static with(userModel: IUserModel): User {
        return new User(userModel);
    }
}