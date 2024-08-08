import { Card, CardBody, CardHeader, Divider, Heading, Tag } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { ITask } from "../../../types/interfaces/ITask";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useListAllTasks } from "../../../hooks/tasks/useListTasks";

export function TasksWall() {

    const { data: tasks } = useListAllTasks();

    const formatDate = (date: string | Date): string => {
        return dayjs(date).format("DD/MM/YY HH:mm");
    }

    return (
        <section className="p-10">
            <h2 className="text-5xl">Mural de Tarefas</h2>

            <Divider className="my-10" />

            <div className="mt-6 grid grid-cols-3 gap-y-20">
                {tasks?.map((task: ITask) => (
                    <Card key={task.id} shadow='xl' className="w-4/5 h-[30rem] justify-self-center" style={{ background: task.category?.backgroundColor, color: task.category?.textColor }}>
                        <CardHeader className="space-y-1">
                            <Heading size='md'>
                                {task.title}
                            </Heading>
                            <Heading size='sm'>
                                {formatDate(task.startDateTime)} - {formatDate(task.endDateTime)}
                            </Heading>
                            <Heading size='sm'>
                                {task.completed && <Tag size={"lg"} variant='solid' colorScheme='green' borderRadius={"full"} className="mt-2">Concluído</Tag>}
                            </Heading>
                        </CardHeader>

                        <CardBody className="overflow-y-auto">
                            {task.description}
                        </CardBody>
                    </Card>
                ))}

                <Card backgroundColor="silver" shadow='xl' className="w-4/5 h-[30rem] justify-self-center">
                    <CardBody className="flex items-center justify-center">
                        <Link to="/tasks/new-task">
                            <FiPlus size="30%" className="mx-auto" />
                        </Link>
                    </CardBody>
                </Card>
            </div>

        </section>
    )
}