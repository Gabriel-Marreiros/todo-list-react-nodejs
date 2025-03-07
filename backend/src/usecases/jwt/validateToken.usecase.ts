import { InvalidTokenError } from "../../errors/jwt/InvalidTokenError";
import { IUseCase } from "../IUseCase";
import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config';

export class ValidateTokenUseCase implements IUseCase<string, any> {

    private readonly tokenSecret: string = process.env.TOKEN_SECRET!;

    constructor(){}

    public execute(token: string): any {
        try {
            const tokenPayload = jsonwebtoken.verify(token, this.tokenSecret);
            return tokenPayload;
        } 
        catch (error) {
            throw new InvalidTokenError(
                "Token inválido",
                "O token enviado é inválido.",
                404
            );    
        }
    }
}

export const validateTokenUseCase = new ValidateTokenUseCase();