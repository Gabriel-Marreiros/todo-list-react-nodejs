import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../libs/axios/axiosClient";

async function authenticateFn(token: {token: string}): Promise<boolean>{
    const response = await axiosClient.post<boolean>("/auth/authenticate-token", token);

    return response.data;
}

export function useAuthenticateToken(){

    const mutation = useMutation({
        mutationFn: authenticateFn,
    })

    return mutation;
}