import { Table as ChakraTable, Tbody } from "@chakra-ui/react";
import { createContext, ReactNode, useReducer } from "react";
import { IconType } from "react-icons";

interface TasksTableProps {
    title: string;
    titleIcon?: IconType;
    children: ReactNode | ReactNode[];
    className?: string;
}

interface TaskTableAction {
    type: "checked" | "unchecked" | "clean";
    taskId?: string;
}

interface TasksTableContextType {
    tasksId: string[];
    tasksIdDispatcher: React.Dispatch<TaskTableAction>
}

export const TaskTableContext = createContext<TasksTableContextType>({ tasksId: [], tasksIdDispatcher: () => { } });

const taskIdReducer = (state: string[], action: TaskTableAction) => {
    switch (action.type) {
        case "checked": {
            return [...state, action.taskId!];
        }

        case "unchecked": {
            return state.filter((taskId) => taskId != action.taskId!);
        }

        case "clean": {
            return []
        }
    }
}

export function Table({ title, titleIcon: TitleIcon, className, children }: TasksTableProps) {
    const [tasksId, tasksIdDispatcher] = useReducer(taskIdReducer, []);

    return (
        <div className={`p-6 border rounded-md shadow-lg ${className}`}>
            <div className="flex items-center gap-2 mb-4 text-2xl">
                <h3 className="font-semibold">{title} </h3>
                {TitleIcon && <TitleIcon/>}
            </div>

            <ChakraTable variant='simple'>
                <Tbody>
                    <TaskTableContext.Provider value={{ tasksIdDispatcher, tasksId }}>
                        {children}
                    </TaskTableContext.Provider>
                </Tbody>
            </ChakraTable>


        </div>
    )
}