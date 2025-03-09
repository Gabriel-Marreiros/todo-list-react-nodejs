import { jwtDecode } from "jwt-decode";
import { ITokenPayload } from "../types/interfaces/ITokenPayload";

export function getPayloadFromTokenJwt(): ITokenPayload {
    const tokenName: string = import.meta.env.VITE_ACCESS_TOKEN_NAME;
    const token: string = localStorage.getItem(tokenName) || "";

    const payload = jwtDecode<ITokenPayload>(token);

    return payload;
}