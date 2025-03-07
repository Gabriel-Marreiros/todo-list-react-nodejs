import { default as dayJs, default as dayjs } from 'dayjs';
import 'dayjs/locale/pt';
import { useEffect, useState } from "react";
import { Calendar, Messages, View, Views, dayjsLocalizer } from "react-big-calendar";
import { Outlet, useNavigate } from "react-router-dom";
import { PageTitle } from "../../../components/PageTitle";
import { useGetTasksByDate } from "../../../hooks/tasks/useGetTasksByDate";
import { useGetTasksByDateRange } from "../../../hooks/tasks/useGetTasksByDateRange";
import { ITask } from "../../../types/interfaces/ITask";


export function TaskCalendar() {
    dayjs.locale("pt-br");
    
    const defaultView = Views.MONTH;
    const [currentView, setCurrentView] = useState<View>(defaultView);
    
    const initialStartDateRange: string = dayjs().date(1).format('YYYY-MM-DD');
    const initialEndDateRange: string = dayjs().date(dayjs().daysInMonth()).format('YYYY-MM-DD');
    const [{startDateRange, endDateRange}, setDateRange] = useState<{startDateRange: string, endDateRange: string}>({startDateRange: initialStartDateRange, endDateRange: initialEndDateRange});
    const { data: tasksByRange } = useGetTasksByDateRange({startDateRange, endDateRange}, currentView === Views.MONTH);
    
    const today: string = dayjs().format("YYY-MM-DD");
    const [date, setDate] = useState<string>(today);
    const { data: dateTasks } = useGetTasksByDate(date, currentView === Views.DAY);
    
    const [tasks, setTasks] = useState<ITask[]>([]);

    const navigate = useNavigate();

    const translatedMessages: Messages = {
        day: "Tarefas do Dia",
        month: "Tarefas do Mês",
        today: "Hoje",
        next: currentView === Views.MONTH ? "Próximo Mês" : "Próximo Dia",
        previous: currentView === Views.MONTH ? "Mês Anterior" : "Dia Anterior",
    };

    const handleOpenSelectedTask = (task: ITask) => {
        navigate(task.id);
    }

    const handleRangeChange = (range: Date[] | {start: Date, end: Date}) => {
        switch(currentView){
            case "month": {
                const dateRange = range as {start: Date, end: Date};
        
                const startDateRange: string = dayjs(dateRange.start).format("YYYY-MM-DD");
                const endDateRange: string = dayjs(dateRange.end).format("YYYY-MM-DD");

                setDateRange({startDateRange, endDateRange});
                
                break;
            }

            case "day": {
                const date: Date = (range as Date[])[0];
                const dateFilter: string = dayjs(date).format('YYYY-MM-DD');

                setDate(dateFilter);

                break;
            }
        }
    }

    const formateTasksDate = (tasks: ITask[]): ITask[] => {
        const modifiedTasks = tasks.map((task) => { 
            return {
                ...task, 
                startDateTime: new Date(task.startDateTime), 
                endDateTime: new Date(task.endDateTime)}
        });

        return modifiedTasks;
    }

    useEffect(() => {
        const modifiedTasksByRange: ITask[] = formateTasksDate(tasksByRange || []);
        setTasks(modifiedTasksByRange);

    }, [tasksByRange])

    useEffect(() => {
        const modifiedDateTasks: ITask[] = formateTasksDate(dateTasks || []);
        setTasks(modifiedDateTasks);

    }, [dateTasks])

    return (
        <section className="min-h-screen p-3 md:p-8 lg:p-14">
            <PageTitle title="Calendário de Tarefas" />

            <div className="p-3 md:p-6 border rounded-lg bg-white shadow-lg">
                <Calendar
                    events={tasks}
                    defaultView={defaultView}
                    views={{ month: true, day: true }}
                    localizer={dayjsLocalizer(dayJs)}
                    startAccessor='startDateTime'
                    endAccessor='endDateTime'
                    titleAccessor='title'
                    messages={translatedMessages}
                    onSelectEvent={handleOpenSelectedTask}
                    onRangeChange={handleRangeChange}
                    onView={(view) => setCurrentView(view)}
                    className="min-h-screen"
                />
            </div>

            <Outlet />

        </section>
    )
}
