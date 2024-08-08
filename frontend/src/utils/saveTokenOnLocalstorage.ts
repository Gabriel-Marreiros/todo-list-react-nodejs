export function saveTokenOnLocalstorage(token: string){
    if(!token.includes("Bearer ")){
        token = "Bearer " + token;
    }
                
    const accessTokenName = import.meta.env.VITE_ACCESS_TOKEN_NAME;

    localStorage.setItem(accessTokenName, token);
}