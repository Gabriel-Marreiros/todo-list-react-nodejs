import { Divider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { TasksTable } from "../../../components/TasksTable";
import { useListCompletedTasks } from "../../../hooks/tasks/useListCompletedTasks";
import { useListNextTasks } from "../../../hooks/tasks/useListNextTasks";
import { useListTodayTasks } from "../../../hooks/tasks/useListTodayTasks";
import { ITask } from "../../../types/interfaces/ITask";
import { CompleteTasksButton } from "../../../components/TasksTable/CompleteTasksButton";

export function Tasks() {

    const { data: todayTasks } = useListTodayTasks();
    const { data: nextTasks } = useListNextTasks();
    const { data: completedTasks } = useListCompletedTasks();

    return (
        <section className="min-h-screen p-11">
            <h2 className="text-5xl">Tarefas</h2>

            <Divider className="my-10" />

            <TasksTable.Table className="mb-8" title="Hoje">
                <TasksTable.NewTaskButton />

                {todayTasks && todayTasks.map((task: ITask) => (
                    <TasksTable.TableItem key={task.id} task={task} />
                ))}

                <CompleteTasksButton />
            </TasksTable.Table>


            <div className="flex gap-8">
                <TasksTable.Table className="w-6/12" title="Próximas Tarefas">
                    <TasksTable.NewTaskButton />

                    {nextTasks && nextTasks.map((task: ITask) => (
                        <TasksTable.TableItem key={task.id} task={task} />
                    ))}

                    <CompleteTasksButton />
                </TasksTable.Table>

                <TasksTable.Table className="w-6/12" title="Tarefas Concluídas">
                    <TasksTable.NewTaskButton />

                    {completedTasks && completedTasks.map((task: ITask) => (
                        <TasksTable.TableItem key={task.id} task={task} />
                    ))}
                </TasksTable.Table>
            </div>

            <Outlet />
        </section>
    )
}