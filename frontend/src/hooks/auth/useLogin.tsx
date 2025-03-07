import { useMutation } from "@tanstack/react-query";
import { ILoginData } from "../../types/interfaces/ILoginData";
import { axiosClient } from "../../libs/axios/axiosClient";

async function loginFn(loginData: ILoginData): Promise<string>{
    const response = await axiosClient.post<string>("/auth/login", loginData);

    return response.data;
}

export function useLogin(){

    const mutation = useMutation({
        mutationFn: loginFn
    })

    return mutation;
}