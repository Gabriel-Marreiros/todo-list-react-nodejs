import { useQuery } from "@tanstack/react-query";
import { ITask } from "../../types/interfaces/ITask";
import { axiosClient } from "../../libs/axios/axiosClient";
import { IPage } from "../../types/interfaces/IPage";
import { ITaskPagination } from "../../types/interfaces/IPagination";

async function queryFn({page, size}: ITaskPagination): Promise<IPage<ITask[]>>{
    const response = await axiosClient.get<IPage<ITask[]>>(`/tasks`, {
        params: {
            "page": page,
            "size": size
        }
    });

    return response.data;
}

export function useListTasks(pagination: ITaskPagination){
    const query = useQuery({
        queryKey: ['list-tasks', pagination],
        queryFn: () => queryFn(pagination)
    });

    return query;
}