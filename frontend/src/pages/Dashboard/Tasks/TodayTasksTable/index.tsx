import { useState } from "react";
import { useListTodayTasks } from "../../../../hooks/tasks/useListTodayTasks";
import { TasksTable } from "../../../../components/TasksTable";
import { ITask } from "../../../../types/interfaces/ITask";
import { useListLateTasks } from "../../../../hooks/tasks/useListLateTasks";
import { IoIosAlert } from "react-icons/io";

export function TodayTasksTable() {
    const [todayTasksPagination, setTodayTasksPagination] = useState<{ page: number, size: number }>({ page: 1, size: 5 });
    const [lateTasksPagination, setLateTasksPagination] = useState<{ page: number, size: number }>({ page: 1, size: 5 });

    const { data: todayTasks } = useListTodayTasks(todayTasksPagination);
    const { data: lateTasks } = useListLateTasks(lateTasksPagination);

    return (
        <>
            <TasksTable.Table className="bg-white mb-10" title="Hoje">
                <TasksTable.NewTaskButton />

                {
                    todayTasks?.data.length ?
                        todayTasks.data.map((task: ITask) => (
                            <TasksTable.TableItem key={task.id} task={task} />
                        )) :
                        <TasksTable.NoTasksMessage message="Nenhuma tarefa para hoje até o momento!" />
                }

                <TasksTable.CompleteTasksButton />

                <TasksTable.TablePagination totalElements={todayTasks?.totalElements} handlePageChange={(page, size) => setTodayTasksPagination({ page, size })} />
            </TasksTable.Table>

            <TasksTable.Table className="bg-white" title="Tarefas Atrasadas" titleIcon={IoIosAlert}>

                {
                    lateTasks?.data.length ?
                        lateTasks.data.map((task: ITask) => (
                            <TasksTable.TableItem key={task.id} task={task} />
                        )) :
                        <TasksTable.NoTasksMessage message="Nenhuma tarefa atrasada!" />
                }

                <TasksTable.CompleteTasksButton />

                <TasksTable.TablePagination totalElements={lateTasks?.totalElements} handlePageChange={(page, size) => setLateTasksPagination({ page, size })} />
            </TasksTable.Table>
        </>
    )
}