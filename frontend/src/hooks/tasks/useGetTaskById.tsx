import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../libs/axios/axiosClient";
import { ITask } from "../../types/interfaces/ITask";

async function queryFn(taskId: string): Promise<ITask>{
    const response = await axiosClient.get<ITask>(`/tasks/${taskId}`);

    return response.data;
}

export function useGetTaskById(taskId: string){
     const query = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => {
            if(!taskId){
                return null;
            }

            return queryFn(taskId)
        },
    });

    return query;
}