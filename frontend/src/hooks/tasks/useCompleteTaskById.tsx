import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../libs/axios/axiosClient";
import { ITask } from "../../types/interfaces/ITask";

async function queryFn(task: {taskId: string}): Promise<ITask> {
    const response = await axiosClient.post<ITask>("/tasks/complete", task);

    return response.data;
}

export function useCompleteTaskById() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: queryFn,
        onSuccess: () => queryClient.invalidateQueries({ predicate: ({ queryKey }) => (queryKey[0] as string).includes("task") })
    })

    return mutation;
}