import { Button, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { TaskTableContext } from "./Table";
import { useCompleteManyTasksById } from "../../hooks/tasks/useCompleteManyTasksById";

export function CompleteTasksButton() {
    const { tasksId, tasksIdDispatcher } = useContext(TaskTableContext);
    const { mutate: completeManyTasksById } = useCompleteManyTasksById();

    const toast = useToast({position: "bottom"});

    const handleCompleteTasks = () => {
        if (!tasksId.length) {
            return;
        }

        completeManyTasksById(tasksId, {
            onSuccess: () => {
                tasksIdDispatcher({type: "clean"})

                toast({
                    isClosable: true, 
                    duration: 5000, 
                    status: "success", 
                    title: "Tarefas atualizadas com sucesso!"
                })
            },

            onError: (error) => {
                toast({
                    isClosable: true, 
                    duration: 5000, 
                    status: "error", 
                    title: "Ocorreu um erro ao atualizar as tarefas. Por favor, tente novamente mais tarde!"
                })
            }
        })
    }

    return (
        <>
            {!!tasksId.length && <Button className="mt-5" onClick={handleCompleteTasks}>Marcar como concluído</Button>}
        </>
    )
}