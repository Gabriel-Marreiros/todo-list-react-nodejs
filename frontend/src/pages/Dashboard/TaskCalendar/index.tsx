import { Divider } from "@chakra-ui/react";
import dayJs from 'dayjs';
import 'dayjs/locale/pt';
import { Calendar, Messages, View, Views, dayjsLocalizer } from "react-big-calendar";
import { Outlet, useNavigate } from "react-router-dom";
import { ITask } from "../../../types/interfaces/ITask";
import { useEffect, useState } from "react";
import { useListAllTasks } from "../../../hooks/tasks/useListTasks";

dayJs.locale("pt-br")

export function TaskCalendar() {
    const { data: tasks } = useListAllTasks();
    const [formatedTasks, setFormatedTasks] = useState<ITask[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (tasks) {
            const formtasks: ITask[] = tasks.map((task: ITask) => {
                return {
                    ...task,
                    startDateTime: new Date(task.startDateTime),
                    endDateTime: new Date(task.endDateTime),
                }
            })

            setFormatedTasks(formtasks);
        }

    }, [tasks])

    const translatedMessages: Messages = {
        day: "Tarefas do Dia",
        month: "Tarefas do Mês",
        week: "Semanas",
        next: "Próximo Mês",
        today: "Hoje",
        previous: "Mês Anterior",
    };


    // Função responsável por exibir a tarefa clicada
    const handleOpenSelectedTask = (task: ITask) => {
        navigate(task.id);
    }

    const handleRangeChange = (dateRange: Date[] | { start: Date, end: Date }, view: View | undefined): void => {
        console.log(dateRange);
        console.log(view);
    }

    return (
        <section className="p-10">
            <h2 className="text-5xl">Calendário de Tarefas</h2>

            <Divider className="my-10" />

            <div className=" mt-10">
                <Calendar
                    events={formatedTasks}
                    // getNow={() => new Date()}
                    defaultView={Views.MONTH}
                    views={{ month: true, day: true }}
                    localizer={dayjsLocalizer(dayJs)}
                    onSelectEvent={handleOpenSelectedTask}
                    onRangeChange={handleRangeChange}
                    startAccessor='startDateTime'
                    endAccessor='endDateTime'
                    titleAccessor='title'
                    messages={translatedMessages}
                    className="min-h-screen"
                />

            </div>

            <Outlet />

        </section>
    )
}



// Função responsável por criar uma tarefa ao clicar no slot do calendário
// const handleNewTask = useCallback(({ start, end }: SlotInfo) => {
//     const title = window.prompt('New Event name')
//     if (title) {
//         setEvents((prev) => [...prev, { start, end, title }])
//     }
// }, [setEvents])
