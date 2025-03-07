import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../libs/axios/axiosClient";
import { ITasksSummary } from "../../types/interfaces/ITasksSummary";

async function queryFn(): Promise<ITasksSummary>{
    const response = await axiosClient.get<ITasksSummary>(`/tasks/summary`);

    return response.data;
}

export function useGetTasksSummary(){
    const query = useQuery({
        queryKey: ['tasks-summary'],
        queryFn: queryFn
    });

    return query;
}