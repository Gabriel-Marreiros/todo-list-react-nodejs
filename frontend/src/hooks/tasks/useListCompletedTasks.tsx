import { useQuery } from "@tanstack/react-query";
import { ITask } from "../../types/interfaces/ITask";
import { axiosClient } from "../../libs/axios/axiosClient";

async function queryFn(): Promise<ITask[]>{
    const response = await axiosClient.get<ITask[]>(`/tasks/completed`);

    return response.data;
}

export function useListCompletedTasks(){
    const query = useQuery({
        queryKey: ['list-completed-tasks'],
        queryFn: queryFn
    });

    return query;
}