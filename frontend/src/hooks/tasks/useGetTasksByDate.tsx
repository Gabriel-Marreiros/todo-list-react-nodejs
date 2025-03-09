import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../libs/axios/axiosClient";
import { ITask } from "../../types/interfaces/ITask";

async function queryFn(date: string): Promise<ITask[]>{
    const response = await axiosClient.get<ITask[]>(`/tasks/by-date`, {
        params: {
            "date": date,
        }
    });

    return response.data;
}

export function useGetTasksByDate(date: string, enabled: boolean = true){
    const query = useQuery({
        queryKey: ['tasks-by-date', date],
        queryFn: () => queryFn(date),
        enabled: enabled
    });

    return query;
}