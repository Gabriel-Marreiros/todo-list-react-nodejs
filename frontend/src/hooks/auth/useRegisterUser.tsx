import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../libs/axios/axiosClient";
import { IRegisterUserResponse } from "../../types/interfaces/IRegisterUserResponse";
import { IUser } from "../../types/interfaces/IUser";

async function registerFn(registerData: IUser): Promise<IRegisterUserResponse>{
    const response = await axiosClient.post<IRegisterUserResponse>("/auth/register-user", registerData);

    return response.data;
}

export function useRegisterUser(){

    const mutation = useMutation({
        mutationFn: registerFn
    })

    return mutation;
}