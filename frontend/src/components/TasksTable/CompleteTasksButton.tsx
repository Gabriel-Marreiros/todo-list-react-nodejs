import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { TaskTableContext } from "./Table";
import { useCompleteManyTasksById } from "../../hooks/tasks/useCompleteManyTasksById";

export function CompleteTasksButton() {
    const { tasksId } = useContext(TaskTableContext);
    const { mutate: completeManyTasksById } = useCompleteManyTasksById();

    const handleCompleteTasks = () => {
        if (!tasksId.length) {
            return;
        }

        completeManyTasksById(tasksId, {
            onSuccess: () => {
                console.log("funcionou")
            },

            onError: (error) => {
                console.log("erro", error)
            }
        })
    }

    return (
        <Button className="mt-5" isDisabled={!tasksId.length} onClick={handleCompleteTasks}>Marcar como concluído</Button>
    )
}