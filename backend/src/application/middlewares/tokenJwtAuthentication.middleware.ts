import { Request, Response, NextFunction, Handler } from "express";
import { IMiddleware } from "./IMiddleware";
import { validateTokenUseCase, ValidateTokenUseCase } from "../../domain/useCases/jwt/validateToken.usecase";
import { NoTokenJwtError } from "../../domain/errors/jwt/noTokenJwtError";

class TokenJwtAuthenticationMiddleware implements IMiddleware {

    constructor(
        private validateTokenUseCase: ValidateTokenUseCase
    ){}

    public handle(): Handler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try{
                const authorizationHeader: string | undefined = request.header("Authorization");
        
                if(!authorizationHeader){
                    throw new NoTokenJwtError(
                        "Sem token JWT.",
                        "Sem token de acesso.",
                        401
                    );
                };
        
                const token: string = authorizationHeader.replace("Bearer ", "");
        
                const tokenPayload = await this.validateTokenUseCase.execute(token);
                console.log(tokenPayload.userId);
                request.headers["user-id"] = tokenPayload.userId;
        
                next();   
            }
            catch(error){
                next(error)
            }
        }
    }
};

export const tokenJwtAuthenticationMiddleware = new TokenJwtAuthenticationMiddleware(
    validateTokenUseCase
);