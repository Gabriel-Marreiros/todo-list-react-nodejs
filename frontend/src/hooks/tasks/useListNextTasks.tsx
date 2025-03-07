import { useQuery } from "@tanstack/react-query";
import { ITask } from "../../types/interfaces/ITask";
import { axiosClient } from "../../libs/axios/axiosClient";
import { ITaskPagination } from "../../types/interfaces/IPagination";
import { IPage } from "../../types/interfaces/IPage";

async function queryFn({page, size}: ITaskPagination): Promise<IPage<ITask[]>>{
    const response = await axiosClient.get<IPage<ITask[]>>(`/tasks/next`, {
        params: {
            "page": page,
            "size": size
        }
    });

    return response.data;
}

export function useListNextTasks(pagination: ITaskPagination){
    const query = useQuery({
        queryKey: ['list-next-tasks', pagination],
        queryFn: () => queryFn(pagination)
    });

    return query;
}