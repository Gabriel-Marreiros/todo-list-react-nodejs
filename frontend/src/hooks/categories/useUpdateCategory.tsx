import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryFormData } from "../../components/CategoryForm";
import { axiosClient } from "../../libs/axios/axiosClient";
import { ICategory } from "../../types/interfaces/ICategory";

async function updateCategoryFn(category: Partial<CategoryFormData>): Promise<Partial<CategoryFormData>>{
    const response = await axiosClient.put<ICategory>(`/categories/${category.id}`, category);

    return response.data;
}

export function useUpdateCategory(){
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateCategoryFn,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['list-categories']})
    })

    return mutation;
}