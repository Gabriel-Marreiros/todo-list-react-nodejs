import { useState } from "react";
import { useListNextTasks } from "../../../../hooks/tasks/useListNextTasks";
import { TasksTable } from "../../../../components/TasksTable";
import { ITask } from "../../../../types/interfaces/ITask";

export function NextTasksTable() {
    const [nextTasksPagination, setNextTasksPagination] = useState<{ page: number, size: number }>({ page: 1, size: 10 });
    const { data: nextTasks } = useListNextTasks(nextTasksPagination);

    return (
        <TasksTable.Table className="bg-white" title="Próximas Tarefas">
            <TasksTable.NewTaskButton />

            {
                nextTasks?.data.length ?
                    nextTasks.data.map((task: ITask) => (
                        <TasksTable.TableItem key={task.id} task={task} />
                    )) :
                    <TasksTable.NoTasksMessage message="Sem próximas tarefas!" />
            }

            <TasksTable.CompleteTasksButton />

            <TasksTable.TablePagination handlePageChange={(page, size) => setNextTasksPagination({ page, size })} />
        </TasksTable.Table>
    )
}