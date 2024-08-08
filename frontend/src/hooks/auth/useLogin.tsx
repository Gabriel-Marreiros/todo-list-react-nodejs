import { useMutation } from "@tanstack/react-query";
import { ILoginData } from "../../types/interfaces/ILoginData";
import { axiosClient } from "../../libs/axios/axiosClient";
import { ILoginResponse } from "../../types/interfaces/ILoginResponse";

async function loginFn(loginData: ILoginData): Promise<ILoginResponse>{
    const response = await axiosClient.post<ILoginResponse>("/auth/login", loginData);

    return response.data;
}

export function useLogin(){

    const mutation = useMutation({
        mutationFn: loginFn
    })

    return mutation;
}