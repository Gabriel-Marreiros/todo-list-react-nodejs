import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../libs/axios/axiosClient";
import { ICategory } from "../../types/interfaces/ICategory";

async function saveCategoryFn(category: Partial<ICategory>): Promise<ICategory>{
    const response = await axiosClient.post<ICategory>("/categories", category);

    return response.data;
}


export function useSaveCategory(){
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: saveCategoryFn,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['list-categories']})
    })

    return mutation;
}