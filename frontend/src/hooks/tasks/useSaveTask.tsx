import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../libs/axios/axiosClient";
import { ITask } from "../../types/interfaces/ITask";

async function saveTaskFn(taskData: Partial<ITask>): Promise<ITask> {
    const response = await axiosClient.post<ITask>("/tasks", taskData);

    return response.data;
}

export function useSaveTask() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: saveTaskFn,
        onSuccess: () => queryClient.invalidateQueries({ predicate: ({ queryKey }) => (queryKey[0] as string).includes("task") })
    })

    return mutation;
}