import { IUseCase } from "../IUseCase";
import bcrypt  from "bcrypt";

interface IProps {
    inputPassword: string;
    userPassword: string;
}

export class CheckPasswordIsCorrectUseCase implements IUseCase<IProps, Promise<boolean>> {

    constructor(){}

    public async execute({inputPassword, userPassword}: IProps): Promise<boolean> {
        const isCorrect: boolean = await bcrypt.compare(inputPassword, userPassword);

        return isCorrect;
    }
}

export const checkPasswordIsCorrectUseCase = new CheckPasswordIsCorrectUseCase();