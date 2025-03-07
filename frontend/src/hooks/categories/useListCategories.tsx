import { useQuery } from "@tanstack/react-query";
import { ICategory } from "../../types/interfaces/ICategory";
import { axiosClient } from "../../libs/axios/axiosClient";

async function getCategories(): Promise<ICategory[]>{
    const response = await axiosClient.get<ICategory[]>("/categories");

    return response.data;
}

export function useListCategories(){
    const query = useQuery({
        queryKey: ["list-categories"],
        queryFn: getCategories
    });

    return query;
}