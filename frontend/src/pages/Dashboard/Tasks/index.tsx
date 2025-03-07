import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { PageTitle } from "../../../components/PageTitle";
import { CompletedTasksTable } from "./CompletedTasksTable";
import { NextTasksTable } from "./NextTasksTable";
import { TodayTasksTable } from "./TodayTasksTable";

export function Tasks() {

    return (
        <section className="min-h-screen p-2 md:p-5 xl:p-14">
            <PageTitle title="Tarefas" />

            <Tabs isLazy position='relative' variant='unstyled'>
                <TabList>
                    <Tab>Tarefas de Hoje</Tab>
                    <Tab>Próximas Tarefas</Tab>
                    <Tab>Tarefas Concluídas</Tab>
                </TabList>

                <TabIndicator mt='-1.5px' height='3px' bg='gray.500' borderRadius='1px' />

                <TabPanels className="mt-4">
                    <TabPanel>
                        <TodayTasksTable />
                    </TabPanel>

                    <TabPanel>
                        <NextTasksTable />
                    </TabPanel>

                    <TabPanel>
                        <CompletedTasksTable />
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <Outlet />
        </section>
    )
}