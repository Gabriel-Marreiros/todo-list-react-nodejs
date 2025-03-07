export interface IAuthenticationService {
    login(loginData: any): Promise<string>;
    authenticateToken(token: string): Promise<boolean>;
}