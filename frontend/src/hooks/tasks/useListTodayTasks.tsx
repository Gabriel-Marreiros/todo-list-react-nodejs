import { useQuery } from "@tanstack/react-query";
import { ITask } from "../../types/interfaces/ITask";
import { axiosClient } from "../../libs/axios/axiosClient";

async function queryFn(): Promise<ITask[]>{
    const response = await axiosClient.get<ITask[]>(`/tasks/today`);

    return response.data;
}

export function useListTodayTasks(){
    const query = useQuery({
        queryKey: ['list-today-tasks'],
        queryFn: queryFn
    });

    return query;
}