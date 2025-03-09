import { Badge, Checkbox, Td, Tr } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { ITask } from "../../types/interfaces/ITask";
import { useContext } from "react";
import { TaskTableContext } from "./Table";

interface tasksTableItemProps {
    task: ITask
}

export function TableItem({ task }: tasksTableItemProps) {
    const { tasksIdDispatcher } = useContext(TaskTableContext);

    const handleSelectTask = (event: React.ChangeEvent<HTMLInputElement>) => {
        const type = event.target.checked ? "checked" : "unchecked";
        const taskId: string = event.target.value;

        tasksIdDispatcher({ type, taskId });
    }

    return (
        <Tr>
            <Td className="flex items-start gap-5">

                {!task.completed && <Checkbox className="mt-1" value={task.id} onChange={handleSelectTask} />}

                <Link to={`/tasks/${task.id}`}>
                    <div>
                        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</span>
                    </div>

                    <div>
                        {task.category &&
                            <div className="flex items-center gap-1">
                                <div className={`h-3 w-3 rounded-sm`} style={{ backgroundColor: task.category.backgroundColor }}></div>
                                <small>{task.category.name}</small>
                            </div>
                        }

                        {task.recurrent && <Badge>Recorrente</Badge>}
                    </div>
                </Link>

                <IoIosArrowForward className="ml-auto" />

            </Td>
        </Tr>
    )
}