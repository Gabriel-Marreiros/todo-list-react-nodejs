import { useQuery } from "@tanstack/react-query";
import { ITask } from "../../types/interfaces/ITask";
import { axiosClient } from "../../libs/axios/axiosClient";

async function queryFn(): Promise<ITask[]>{
    const response = await axiosClient.get<ITask[]>(`/tasks`);

    return response.data;
}

export function useListAllTasks(){
    const query = useQuery({
        queryKey: ['list-all-tasks'],
        queryFn: queryFn
    });

    return query;
}