import { useState } from "react";
import { useListCompletedTasks } from "../../../../hooks/tasks/useListCompletedTasks";
import { TasksTable } from "../../../../components/TasksTable";
import { ITask } from "../../../../types/interfaces/ITask";

export function CompletedTasksTable() {
    const [completedTasksPagination, setCompletedTasksPagination] = useState<{ page: number, size: number }>({ page: 1, size: 5 });
    const { data: completedTasks } = useListCompletedTasks(completedTasksPagination);

    return (
        <TasksTable.Table className="bg-white" title="Tarefas Concluídas">
            <TasksTable.NewTaskButton />

            {
                completedTasks?.data.length ?
                    completedTasks.data.map((task: ITask) => (
                        <TasksTable.TableItem key={task.id} task={task} />
                    )) :
                    <TasksTable.NoTasksMessage message="Nenhuma tarefa concluída até o momento!" />
            }

            <TasksTable.TablePagination handlePageChange={(page, size) => setCompletedTasksPagination({ page, size })} />
        </TasksTable.Table>
    )
}