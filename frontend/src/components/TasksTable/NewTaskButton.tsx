import { Td, Tr } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

export function NewTaskButton() {
    return (
        <Tr className="border-y bg-gray-50" >
            <Td>
                <Link to="/tasks/new-task" className="flex items-center gap-3">
                    <FiPlus />
                    <span>Adicionar nova tarefa</span>
                </Link>
            </Td>
        </Tr>
    )
}