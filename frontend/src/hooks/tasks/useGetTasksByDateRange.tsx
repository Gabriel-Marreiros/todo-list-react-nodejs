import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../libs/axios/axiosClient";
import { ITask } from "../../types/interfaces/ITask";

async function queryFn({startDateRange, endDateRange}: {startDateRange: string, endDateRange: string}): Promise<ITask[]>{
    const response = await axiosClient.get<ITask[]>(`/tasks/by-date-range`, {
        params: {
            "startDateRange": startDateRange,
            "endDateRange": endDateRange
        }
    });

    return response.data;
}

export function useGetTasksByDateRange(dateRange: {startDateRange: string, endDateRange: string}, enabled: boolean = true){
    const query = useQuery({
        queryKey: ['tasks-by-date-range', dateRange],
        queryFn: () => queryFn(dateRange),
        enabled: enabled
    });

    return query;
}