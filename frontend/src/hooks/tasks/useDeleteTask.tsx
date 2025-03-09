import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../libs/axios/axiosClient";
import { ITask } from "../../types/interfaces/ITask";

async function deleteTaskFn(taskId: string): Promise<ITask>{
    const response = await axiosClient.delete<ITask>(`/tasks/${taskId}`);

    return response.data;
}

export function useDeleteTask(){
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteTaskFn,
        onSuccess: () => queryClient.invalidateQueries({ predicate: ({ queryKey }) => (queryKey[0] as string).includes("task") })
    })

    return mutation;
}