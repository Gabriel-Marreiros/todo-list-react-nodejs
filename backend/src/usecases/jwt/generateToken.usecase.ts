import jsonWebToken from "jsonwebtoken";
import { IUseCase } from "../IUseCase";
import { User } from "../../entities/user.entity";
import 'dotenv/config';

export class GenerateTokenUseCase implements IUseCase<User, string> {
    private readonly tokenSecret: string = process.env.TOKEN_SECRET!;

    constructor(){}
    
    public execute(user: User) {
        const token = jsonWebToken.sign(
            {
                userId: user.id,
                name: user.name,
                // profileImage: user.profileImage
            },
            this.tokenSecret
        );

        return token;
    }


}

export const generateTokenUseCase = new GenerateTokenUseCase();