import { IUseCase } from "../IUseCase";
import bcrypt from "bcrypt";

export class EncryptUserPasswordUseCase implements IUseCase<string, Promise<string>> {

    constructor(){}

    public async execute(password: string): Promise<string> {
        const encryptedPassword: string = await bcrypt.hash(password, 12);

        return encryptedPassword;
    }

}

export const encryptUserPasswordUseCase = new EncryptUserPasswordUseCase();