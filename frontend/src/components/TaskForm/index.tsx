import { Button, ButtonGroup, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, Input, Select, Tag, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { string, z } from "zod";
import { useListCategories } from "../../hooks/categories/useListCategories";
import { useCompleteTaskById } from "../../hooks/tasks/useCompleteTaskById";
import { useDeleteTask } from "../../hooks/tasks/useDeleteTask";
import { useGetTaskById } from "../../hooks/tasks/useGetTaskById";
import { useSaveTask } from "../../hooks/tasks/useSaveTask";
import { useUpdateTask } from "../../hooks/tasks/useUpdateTask";
import { ITask } from "../../types/interfaces/ITask";
import { ConfirmModal } from "../ConfirmModal";
import { NotificationModal } from "../NotificationModal";
import { LoadingModal } from "../LoadingModal";

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
        .optional()
        .transform((value) => value === "" ? null : value),
    startDateTime: z
        .coerce
        .date()
        .or(string())
        .refine(
            (startDateTime) => dayjs(startDateTime).isAfter(dayjs()),
            "A data de início não pode ser inferior à data atual"
        ),
    endDateTime: z
        .coerce
        .date()
        .or(string()),
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
    const { register, handleSubmit, formState: { errors }, setValue, reset: resetForm } = useForm<TaskFormData>({ resolver: zodResolver(taskFormSchema) })

    const navigate = useNavigate();

    const { taskId } = useParams();

    const { data: taskDetails } = useGetTaskById(taskId!);

    const { mutate: saveTask } = useSaveTask();
    const { mutate: updateTask } = useUpdateTask();
    const { mutate: deleteTask } = useDeleteTask();
    const { mutate: completeTaskById } = useCompleteTaskById();

    const { data: categoriesOptions } = useListCategories();

    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
    const [confirmModalConfig, setConfirmModalConfig] = useState<{headerText: string, bodyText: string, callback: VoidFunction}>();

    const [openNotificationModal, setOpenNotificationModal] = useState<boolean>(false);
    const [notificationModalText, setNotificationModalText] = useState<string>("");

    const[openLoadingModal, setOpenLoadingModal] = useState<boolean>(false);

    const handleCloseForm = (): void => {
        resetForm();
        navigate(-1);
    }

    const handleSaveTask = (taskData: TaskFormData): void => {
        setOpenLoadingModal(true);

        saveTask(taskData as ITask, {
            onSuccess: () => {
                setOpenLoadingModal(false);
                handleCloseForm();
            },

            onError: (error) => {
                setOpenLoadingModal(false);

                setNotificationModalText("Desculpe! Ocorreu um erro ao salvar a tarefa. Por favor tente novamente mais tarde.")
                setOpenNotificationModal(true);
            }
        })
    }

    const handleUpdateTask = (taskUpdate: TaskFormData): void => {
        setOpenLoadingModal(true);

        updateTask(taskUpdate as ITask, {
            onSuccess: () => {
                setOpenLoadingModal(false);
                handleCloseForm();
            },

            onError: (error) => {
                setOpenLoadingModal(false);

                setNotificationModalText("Desculpe! Ocorreu um erro ao atualizar a tarefa. Por favor tente novamente mais tarde.")
                setOpenNotificationModal(true);
            }
        })
    }

    const handleDeleteTask = (taskData: TaskFormData): void => {
        setOpenLoadingModal(true);

        const taskId: string | undefined = taskData.id;

        if (!taskId) {
            return;
        }

        deleteTask(taskId, {
            onSuccess: () => {
                setOpenLoadingModal(false);
                handleCloseForm();
            },

            onError: (error) => {
                setOpenLoadingModal(false);

                setNotificationModalText("Desculpe! Ocorreu um erro ao deletar a tarefa. Por favor tente novamente mais tarde.")
                setOpenNotificationModal(true);
            }
        })
    }

    const handleCompleteTask = (taskData: TaskFormData): void => {
        setOpenLoadingModal(true);

        const taskId: string | undefined = taskData.id;

        if (!taskId) {
            return;
        }

        completeTaskById({ taskId }, {
            onSuccess: () => {
                setOpenLoadingModal(false);
                handleCloseForm();
            },

            onError: (error) => {
                setOpenLoadingModal(false);

                setNotificationModalText("Desculpe! Ocorreu um erro ao definir a tarefa como concluída. Por favor tente novamente mais tarde.")
                setOpenNotificationModal(true);
            }
        })
    }

    const openConfirmDeleteModal = (): void => {
        setOpenConfirmModal(true);
        
        setConfirmModalConfig({
            headerText: "Exclusão de categoria",
            bodyText: "Tem certeza que deseja deletar a categoria?",
            callback: handleSubmit(handleDeleteTask)
        })
    }

    const openConfirmUpdateModal = (): void => {
        setOpenConfirmModal(true);

        setConfirmModalConfig({
            headerText: "Atualização de categoria",
            bodyText: "Tem certeza que deseja atualizar a categoria?",
            callback: handleSubmit(handleUpdateTask)
        })
    }

    const openCompleteTaskModal = (): void => {
        setOpenConfirmModal(true);

        setConfirmModalConfig({
            headerText: "Concluir Tarefa",
            bodyText: "Tem certeza que deseja marcar essa tarefa como concluída?",
            callback: handleSubmit(handleCompleteTask)
        })
    }

    useEffect(() => {
        if (taskDetails) {
            setValue("id", taskDetails.id);
            setValue("title", taskDetails.title);
            setValue("description", taskDetails.description);
            setValue("category", taskDetails?.category?.id);
            setValue("startDateTime", dayjs(taskDetails.startDateTime).format("YYYY-MM-DDTHH:mm"));
            setValue("endDateTime", dayjs(taskDetails.endDateTime).format("YYYY-MM-DDTHH:mm"));
            setValue("recurrent", taskDetails.recurrent);
            setValue("completed", taskDetails.completed);
        }
    }, [taskDetails]);

    return (
        <>
            <Drawer
                isOpen={true}
                onClose={handleCloseForm}
                size='lg'
                placement='right'>

                <DrawerOverlay />

                <DrawerContent className="px-4">

                    <DrawerCloseButton />

                    <DrawerHeader className="flex items-center gap-2">
                        <h2 className="text-3xl">
                            {taskDetails ? "Tarefa" : "Nova Tarefa"}
                        </h2>

                        {taskDetails && <Tag size={"lg"} variant='solid' colorScheme={taskDetails?.completed ? "green" : "gray"} borderRadius={"full"} className="mt-2">{taskDetails?.completed ? "Concluído" : "Pendente"}</Tag>}

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
                            {!taskDetails && <Button type="button" onClick={handleSubmit(handleSaveTask)}>Salvar</Button>}
                            {(taskDetails && !taskDetails.completed) && <Button type="button" onClick={openConfirmUpdateModal}>Atualizar</Button>}
                            {taskDetails && <Button type="button" onClick={openConfirmDeleteModal}>Deletar</Button>}
                            {(taskDetails && !taskDetails.completed) && <Button type="button" onClick={openCompleteTaskModal}>Marcar como concluído</Button>}
                        </ButtonGroup>
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>

            {openConfirmModal && <ConfirmModal isOpen={openConfirmModal} setIsOpen={setOpenConfirmModal} headerText={confirmModalConfig!.headerText} bodyText={confirmModalConfig!.bodyText} callback={confirmModalConfig!.callback} />}
            {openNotificationModal && <NotificationModal openModal={openNotificationModal} setOpenModal={setOpenNotificationModal} bodyText={notificationModalText} />}
            {openLoadingModal && <LoadingModal openModal={openLoadingModal} setOpenModal={setOpenLoadingModal}/>}
        
        </>
    )
}