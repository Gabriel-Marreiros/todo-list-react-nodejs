import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../libs/axios/axiosClient";
import { ITask } from "../../types/interfaces/ITask";

async function updateTaskFn(taskUpdate: ITask): Promise<ITask>{
    const response = await axiosClient.put<ITask>(`/tasks/${taskUpdate.id}`, taskUpdate);

    return response.data;
}

export function useUpdateTask(){
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateTaskFn,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['list-all-tasks']})
    })

    return mutation;
}