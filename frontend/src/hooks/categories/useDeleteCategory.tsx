import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICategory } from "../../types/interfaces/ICategory";
import { axiosClient } from "../../libs/axios/axiosClient";

async function deleteCategoryFn(categoryId: string): Promise<ICategory> {
    const response = await axiosClient.delete<ICategory>(`/categories/${categoryId}`);

    return response.data;
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteCategoryFn,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['list-categories'] })
    })

    return mutation;
}