import { Button, ButtonGroup, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, Input, Select, Tag, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useListAllCategories } from "../../hooks/categories/useListAllCategories";
import { useCompleteTaskById } from "../../hooks/tasks/useCompleteTaskById";
import { useDeleteTask } from "../../hooks/tasks/useDeleteTask";
import { useGetTaskById } from "../../hooks/tasks/useGetTaskById";
import { useSaveTask } from "../../hooks/tasks/useSaveTask";
import { useUpdateTask } from "../../hooks/tasks/useUpdateTask";
import { ITask } from "../../types/interfaces/ITask";

const taskFormSchema = z.object({
    id: z
        .string()
        .optional(),
    title: z
        .string()
        .nonempty("Tem que ter um titulo"),
    description: z
        .string()
        .nonempty("Tem que ter uma descrição"),
    category: z
        .string()
        .optional(),
    startDateTime: z
        .coerce
        .date()
        .refine(
            (startDateTime) => dayjs(startDateTime).isAfter(dayjs()),
            "A data de início não pode ser inferior à data atual"
        ),
    endDateTime: z
        .coerce
        .date(),
    recurrent: z
        .boolean()
        .default(false),
    completed: z
        .boolean()
        .default(false),
})
    .refine(
        ({ startDateTime, endDateTime }) => dayjs(startDateTime).isBefore(dayjs(endDateTime)),
        {
            message: "Data de termino não pode ser inferior à data de início",
            path: ["endDateTime"]
        }
    )

type TaskFormData = z.infer<typeof taskFormSchema>;

export function TaskForm() {
    const { register, handleSubmit, formState: { errors }, setValue, reset: resetForm, getValues: getFormValues } = useForm<TaskFormData>({ resolver: zodResolver(taskFormSchema) })

    const navigate = useNavigate();

    const { taskId } = useParams();

    const { data: taskDetails } = useGetTaskById(taskId!);
    const { mutate: saveTask } = useSaveTask();
    const { mutate: updateTask } = useUpdateTask();
    const { mutate: deleteTask } = useDeleteTask();
    const { mutate: completeTaskById } = useCompleteTaskById();

    const { data: categoriesOptions } = useListAllCategories();

    const handleCloseForm = (): void => {
        resetForm();
        navigate(-1);
    }

    const handleSaveTask = (taskData: TaskFormData): void => {
        console.log(taskData)

        saveTask(taskData as ITask, {
            onSuccess: () => {
                handleCloseForm();
            },

            onError: (error) => {
                console.log("erro", error);
            }
        })
    }

    const handleUpdateTask = (taskUpdate: TaskFormData): void => {
        console.log(taskUpdate)
        updateTask(taskUpdate as ITask, {
            onSuccess: () => {
                handleCloseForm();
            },

            onError: (error) => {
                console.log("erro", error);
            }
        })
    }

    const handleDeleteTask = (): void => {
        const taskId: string | undefined = getFormValues("id");

        if (!taskId) {
            console.log("A task não tem ID");
            return;
        }

        deleteTask(taskId, {
            onSuccess: () => {
                handleCloseForm();
            },

            onError: (error) => {
                console.log("erro", error);
            }
        })
    }

    const handleCompleteTask = () => {
        const taskId: string | undefined = getFormValues("id");

        if (!taskId) {
            return;
        }

        completeTaskById({ taskId }, {
            onSuccess: () => {
                handleCloseForm();
            },

            onError: (error) => {
                console.log("erro", error);
            }
        })
    }

    useEffect(() => {
        if (taskDetails) {
            setValue("id", taskDetails.id);
            setValue("title", taskDetails.title);
            setValue("description", taskDetails.description);
            setValue("category", taskDetails?.category?.id);
            setValue("startDateTime", dayjs(taskDetails.startDateTime).toDate());
            setValue("endDateTime", dayjs(taskDetails.endDateTime).toDate());
            setValue("recurrent", taskDetails.recurrent);
            setValue("completed", taskDetails.completed);
        }
    }, [taskDetails])

    return (
        <Drawer
            isOpen={true}
            onClose={handleCloseForm}
            size='lg'
            placement='right'>

            <DrawerOverlay />

            <DrawerContent className="px-4">

                <DrawerCloseButton />

                <DrawerHeader>
                    <h2 className="text-3xl">
                        {taskDetails ? "Tarefa" : "Nova Tarefa"}
                    </h2>

                    {taskDetails?.completed && <Tag size={"lg"} variant='solid' colorScheme='green' borderRadius={"full"} className="mt-2">Concluído</Tag>}
                </DrawerHeader>

                <DrawerBody className="mt-5">
                    <form className="space-y-5">
                        <FormControl isInvalid={!!errors.title} isDisabled={taskDetails?.completed}>
                            <FormLabel>Titulo</FormLabel>
                            <Input type="text" placeholder='' {...register("title")} />
                            {errors.title && <FormErrorMessage >{errors.title.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={!!errors.description} isDisabled={taskDetails?.completed}>
                            <FormLabel>Descrição</FormLabel>
                            <Textarea placeholder='' size='sm' resize='vertical' {...register("description")} />
                            {errors.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isDisabled={taskDetails?.completed}>
                            <FormLabel>Categoria</FormLabel>
                            <Select placeholder='Selecione a categoria' {...register("category")}>
                                {categoriesOptions && categoriesOptions.map(({ id, name }) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </Select>
                            {errors.category && <FormErrorMessage>{errors.category.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={!!errors.startDateTime} isDisabled={taskDetails?.completed}>
                            <FormLabel>Data/Hora de Início</FormLabel>
                            <Input type="datetime-local" placeholder='' {...register("startDateTime")} />
                            {errors.startDateTime && <FormErrorMessage>{errors.startDateTime.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={!!errors.endDateTime} isDisabled={taskDetails?.completed}>
                            <FormLabel>Data/Hora de Termino</FormLabel>
                            <Input type="datetime-local" placeholder='' {...register("endDateTime")} />
                            {errors.endDateTime && <FormErrorMessage>{errors.endDateTime.message}</FormErrorMessage>}
                        </FormControl>
                    </form>
                </DrawerBody>

                <DrawerFooter>
                    <ButtonGroup>
                        <Button type="button" onClick={handleCloseForm}>Cancelar</Button>
                        {!taskDetails && <Button type="button" onClick={handleSubmit(handleSaveTask)}>Salvar</Button>}
                        {(taskDetails && !taskDetails.completed) && <Button type="button" onClick={handleSubmit(handleUpdateTask)}>Atualizar</Button>}
                        {taskDetails && <Button type="button" onClick={handleDeleteTask}>Deletar</Button>}
                        {(taskDetails && !taskDetails.completed) && <Button type="button" onClick={handleCompleteTask}>Marcar como concluído</Button>}
                    </ButtonGroup>
                </DrawerFooter>

            </DrawerContent>
        </Drawer>

        // <AsideForm.Root title="Categoria" openForm={openForm} setOpenForm={setOpenForm} form={form}>
        //     <AsideForm.Form onSubmit={handleSaveTask}>
        //         <AsideForm.FormControl>
        //             <AsideForm.Label>Titulo</AsideForm.Label>
        //             <AsideForm.Input type="text" field="title" />
        //         </AsideForm.FormControl>

        //         <AsideForm.FormControl>
        //             <AsideForm.Label>Descrição</AsideForm.Label>
        //             <AsideForm.Input type='color' field="name" />
        //         </AsideForm.FormControl>

        //         <AsideForm.FormControl>
        //             <AsideForm.Label>Categoria</AsideForm.Label>
        //             <AsideForm.Input type='color' field="name" />
        //         </AsideForm.FormControl>

        //         <AsideForm.FormControl>
        //             <AsideForm.Label>Data/Hora de Início</AsideForm.Label>
        //             <AsideForm.Input type='datetime-local' field="startDateTime" />
        //         </AsideForm.FormControl>

        //         <AsideForm.FormControl>
        //             <AsideForm.Label>Data/Hora de Termino</AsideForm.Label>
        //             <AsideForm.Input type='datetime-local' field="endDateTime" />
        //         </AsideForm.FormControl>
        //     </AsideForm.Form>

        //     <AsideForm.ButtonGroup>
        //         <Button type="button" onClick={handleCloseForm}>Cancelar</Button>
        //         <Button type="submit" form="categoryForm">Salvar</Button>
        //     </AsideForm.ButtonGroup>
        // </AsideForm.Root>
    )
}