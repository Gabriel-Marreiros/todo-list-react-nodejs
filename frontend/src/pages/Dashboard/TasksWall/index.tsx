import { Card, CardBody, CardHeader, Heading, Spinner, Tag } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, Outlet } from "react-router-dom";
import { PageTitle } from "../../../components/PageTitle";
import { useListTasks } from "../../../hooks/tasks/useListTasks";
import { ITask } from "../../../types/interfaces/ITask";

const loader = (
    <div className="mt-6 text-center">
        <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' size='xl' />
    </div>
)

export function TasksWall() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [page, setPage] = useState(1);
    const { data: tasksPage, } = useListTasks({ page: page, size: 5 });
    // const {data: categories} = useListAllCategories();
    const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);

    const formatDate = (date: string | Date): string => {
        return dayjs(date).format("DD/MM/YY HH:mm");
    }

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        if (tasksPage) {
            setTasks((prev) => prev.concat(tasksPage.data))

            if (page >= tasksPage.totalPages) {
                setHasMoreItems(false);
            }
        }

    }, [tasksPage])

    return (
        <section className="min-h-screen p-2 md:p-5 xl:p-14">
            <PageTitle title="Mural de Tarefas" />

            {/* <div className="py-4 px-10 mb-10 border rounded-lg shadow-lg">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <span>Status:</span>
                        <Select >
                            <option value="">Todos</option>
                            <option value="">Pendente</option>
                            <option value="">Concluído</option>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>Categoria:</span>
                        <Select>
                            <option value="">Todos</option>
                            <option value="">Sem Categoria</option>
                            {categories && categories.map((category: ICategory) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>Ordenar por:</span>
                        <Select>
                            <option value="" selected>Data de Criação</option>
                            <option value="">Ordem Alfabética</option>
                            <option value="">Status</option>
                        </Select>
                    </div>
                </div>
            </div> */}

            <InfiniteScroll
                dataLength={tasks.length}
                next={handleNextPage}
                hasMore={hasMoreItems}
                loader={loader}
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-y-10 lg:gap-y-20 overflow-hidden"
            >
                <Card backgroundColor="silver" shadow='xl' className="w-4/5 h-[30rem] justify-self-center">
                    <CardBody className="flex items-center justify-center">
                        <Link to="/tasks-wall/new-task">
                            <FiPlus size="30%" className="mx-auto" />
                        </Link>
                    </CardBody>
                </Card>

                {tasks && tasks.map((task: ITask) => (
                    <Card key={task.id} shadow='xl' className="w-4/5 h-[30rem] justify-self-center" style={{ background: task.category?.backgroundColor, color: task.category?.textColor }}>
                        <CardHeader className="space-y-1">
                            <Heading size='md'>
                                {task.title}
                            </Heading>
                            <Heading size='sm'>
                                {formatDate(task.startDateTime)} - {formatDate(task.endDateTime)}
                            </Heading>
                            <Heading size='sm'>
                                {
                                    task.completed ?
                                        <Tag size={"lg"} variant='solid' colorScheme='green' borderRadius={"full"} className="mt-2">Concluído</Tag> :
                                        <Tag size={"lg"} variant='solid' colorScheme='gray' borderRadius={"full"} className="mt-2">Pendente</Tag>
                                }
                            </Heading>
                        </CardHeader>

                        <CardBody className="overflow-y-auto">
                            {task.description}
                        </CardBody>
                    </Card>
                ))}
            </InfiniteScroll>

            <Outlet />
        </section>
    )
}