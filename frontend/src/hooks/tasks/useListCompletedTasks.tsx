import { useQuery } from "@tanstack/react-query";
import { ITask } from "../../types/interfaces/ITask";
import { axiosClient } from "../../libs/axios/axiosClient";
import { ITaskPagination } from "../../types/interfaces/IPagination";
import { IPage } from "../../types/interfaces/IPage";

async function queryFn({page, size}: ITaskPagination): Promise<IPage<ITask[]>>{
    const response = await axiosClient.get<IPage<ITask[]>>(`/tasks/completed`, {
        params: {
            "page": page,
            "size": size
        }
    });

    return response.data;
}

export function useListCompletedTasks(pagination: ITaskPagination){
    const query = useQuery({
        queryKey: ['list-completed-tasks', pagination],
        queryFn: () => queryFn(pagination)
    });

    return query;
}