import { useQuery } from "@tanstack/react-query";
import { ITask } from "../../types/interfaces/ITask";
import { axiosClient } from "../../libs/axios/axiosClient";

async function queryFn(): Promise<ITask[]>{
    const response = await axiosClient.get<ITask[]>(`/tasks/next`);

    return response.data;
}

export function useListNextTasks(){
    const query = useQuery({
        queryKey: ['list-next-tasks'],
        queryFn: queryFn
    });

    return query;
}