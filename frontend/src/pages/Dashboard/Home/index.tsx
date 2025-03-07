import { FaClock } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { MdOutlineTaskAlt } from "react-icons/md";
import { PageTitle } from "../../../components/PageTitle";

import { useEffect, useState } from "react";
import image from "../../../assets/images/Task-pana.png";
import { useGetTasksSummary } from "../../../hooks/tasks/useGetTasksSummary";
import { getPayloadFromTokenJwt } from "../../../utils/getPayloadFromTokenJwt";

export function Home() {
    const { data: tasksSummary } = useGetTasksSummary();
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        const { name } = getPayloadFromTokenJwt();
        
        setUserName(name);
    })

    return (
        <section className="min-h-screen p-3 sm:p-8 lg:p-14">
            <PageTitle title="Início" />

            <div className="w-full flex justify-between rounded-lg border bg-orange-300 shadow-lg">
                <div className="w-1/2 p-6">
                    <h2 className="text-3xl">Olá, {userName}!</h2>
                    <p className="text-2xl">Bem-vindo ao Todo List react & Node.js</p>
                </div>

                <div className="w-1/2">
                    <img src={image} className="mx-auto w-5/12" />
                </div>
            </div>

            <div>
                <h3 className="mt-10 text-2xl">Resumo de Tarefas</h3>

                <div className="mt-5 flex flex-col md:flex-row gap-5 lg:gap-20 justify-between text-white">

                    <div className="w-full md:w-1/2 2xl:w-1/3 px-7 py-11 flex items-center justify-between rounded-lg bg-green-600 border shadow-lg">
                        <div className="flex flex-col gap-4">
                            <p className="text-2xl">Tarefas para Hoje</p>
                            <span className="text-5xl font-bold">{tasksSummary?.todayTasks}</span>
                        </div>

                        <div>
                            <MdOutlineTaskAlt size={100} />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 2xl:w-1/3 px-7 py-11 flex items-center justify-between rounded-lg bg-blue-800 border shadow-lg">
                        <div className="flex flex-col gap-4">
                            <p className="text-2xl">Tarefas para Amanhã</p>
                            <span className="text-5xl font-bold">{tasksSummary?.tomorrowTasks}</span>
                        </div>

                        <div>
                            <FaClock size={100} />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 2xl:w-1/3 px-7 py-11 flex items-center justify-between rounded-lg bg-red-500 border shadow-lg">
                        <div className="flex flex-col gap-4">
                            <p className="text-2xl">Tarefas em Atraso</p>
                            <span className="text-5xl font-bold">{tasksSummary?.overdueTasks}</span>
                        </div>

                        <div>
                            <IoIosWarning size={100} />
                        </div>
                    </div>
                </div>
            </div>


        </section>
    )
}