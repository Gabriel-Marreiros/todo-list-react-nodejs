import { Table as ChakraTable, Tbody } from "@chakra-ui/react";
import { createContext, ReactNode, useReducer } from "react";

interface TasksTableProps {
    title: string;
    children: ReactNode | ReactNode[];
    className?: string;
}

interface TaskTableAction {
    type: "checked" | "unchecked";
    taskId: string;
}

interface TasksTableContextType {
    tasksId: string[];
    tasksIdDispatcher: React.Dispatch<TaskTableAction>
}

export const TaskTableContext = createContext<TasksTableContextType>({tasksId: [], tasksIdDispatcher: () => {}});

const taskIdReducer = (state: string[], action: TaskTableAction) => {
    switch(action.type){
        case "checked": {
            return [...state, action.taskId];
        }

        case "unchecked": {
            return state.filter((taskId) => taskId != action.taskId);
        }
    }
}

export function Table({ title, className, children }: TasksTableProps) {
    const [tasksId, tasksIdDispatcher] = useReducer(taskIdReducer, []);

    return (
        <div className={`p-6 border rounded-md shadow-lg ${className}`}>
            <h3 className="mb-4 text-3xl font-semibold">{title}</h3>

            <ChakraTable variant='simple'>
                <Tbody>
                    <TaskTableContext.Provider value={{tasksIdDispatcher, tasksId}}>
                        {children}
                    </TaskTableContext.Provider>
                </Tbody>
            </ChakraTable>
            

        </div>
    )
}