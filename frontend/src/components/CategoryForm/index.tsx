import { Button, ButtonGroup, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDeleteCategory } from "../../hooks/categories/useDeleteCategory";
import { useSaveCategory } from "../../hooks/categories/useSaveCategory";
import { useUpdateCategory } from "../../hooks/categories/useUpdateCategory";
import { ICategory } from "../../types/interfaces/ICategory";
import { ConfirmModal } from "../ConfirmModal";
import { NotificationModal } from "../NotificationModal";
import { LoadingModal } from "../LoadingModal";

interface CategoryFormProps {
    openForm: boolean,
    setOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    categorySelected?: ICategory | null
}

const categoryFormSchema = z.object({
    id: z
        .string()
        .optional(),
    name: z
        .string()
        .nonempty("A categoria precisa ter um nome")
        .max(50, "O nome da categoria não pode ter mais que 50 caracteres"),
    backgroundColor: z
        .string()
        .nonempty("A categoria precisa ter uma cor de fundo")
        .default("#ffffff"),
    textColor: z
        .string()
        .nonempty("A categoria precisa ter uma cor de texto")
        .default("#000000")
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

export function CategoryForm({ openForm, setOpenForm, categorySelected }: CategoryFormProps) {

    const { handleSubmit, setValue, reset: resetForm, formState: { errors }, register, watch: watchFormValue } = useForm<CategoryFormData>({ resolver: zodResolver(categoryFormSchema) });

    const { mutate: saveCategory } = useSaveCategory();
    const { mutate: updateCategory } = useUpdateCategory();
    const { mutate: deleteCategory } = useDeleteCategory();

    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
    const [confirmModalConfig, setConfirmModalConfig] = useState<{headerText: string, bodyText: string, callback: VoidFunction}>();

    const [openNotificationModal, setOpenNotificationModal] = useState<boolean>(false);
    const [notificationModalText, setNotificationModalText] = useState<string>("");

    const[openLoadingModal, setOpenLoadingModal] = useState<boolean>(false);

    const handleSaveCategory = (categoryData: CategoryFormData): void => {
        setOpenLoadingModal(true);

        saveCategory(categoryData, {
            onSuccess: () => {
                setOpenLoadingModal(false);
                handleCloseForm();
            },

            onError: (error) => {
                setOpenLoadingModal(false);

                setNotificationModalText("Desculpe! Ocorreu um erro ao salvar a categoria. Por favor tente novamente mais tarde.")
                setOpenNotificationModal(true);
            }
        })
    }

    const handleUpdateCategory = (categoryData: CategoryFormData): void => {
        setOpenLoadingModal(true);

        updateCategory(categoryData, {
            onSuccess() {
                setOpenLoadingModal(false);
                handleCloseForm();
            },

            onError: (error) => {
                setOpenLoadingModal(false);

                setNotificationModalText("Desculpe! Ocorreu um erro ao atualizar a categoria. Por favor tente novamente mais tarde.")
                setOpenNotificationModal(true);
            }
        });
    }

    const handleDeleteCategory = (categoryData: CategoryFormData): void => {
        setOpenLoadingModal(true);

        const categoryId: string | undefined = categoryData.id;

        if (!categoryId) {
            return;
        }

        deleteCategory(categoryId, {
            onSuccess: () => {
                setOpenLoadingModal(false);
                handleCloseForm();
            },

            onError: (error) => {
                setOpenLoadingModal(false);

                setNotificationModalText("Desculpe! Ocorreu um erro ao deletar a categoria. Por favor tente novamente mais tarde.")
                setOpenNotificationModal(true);
            }
        });
    }

    const openConfirmDeleteModal = (): void => {
        setOpenConfirmModal(true);
        
        setConfirmModalConfig({
            headerText: "Exclusão de categoria",
            bodyText: "Tem certeza que deseja deletar a categoria?",
            callback: handleSubmit(handleDeleteCategory)
        })
    }

    const openConfirmUpdateModal = (): void => {
        setOpenConfirmModal(true);

        setConfirmModalConfig({
            headerText: "Atualização de categoria",
            bodyText: "Tem certeza que deseja atualizar a categoria?",
            callback: handleSubmit(handleUpdateCategory)
        })
    }

    const handleCloseForm = (): void => {
        resetForm();
        setOpenForm(false);
    }

    useEffect(() => {
        if (categorySelected) {
            setValue("id", categorySelected.id);
            setValue("name", categorySelected.name);
            setValue("backgroundColor", categorySelected.backgroundColor);
            setValue("textColor", categorySelected.textColor);
        }
    }, [openForm])

    return (
        <>
            <Drawer
                isOpen={openForm}
                onClose={handleCloseForm}
                size='lg'
                placement='right'>

                <DrawerOverlay />

                <DrawerContent className="px-4">

                    <DrawerCloseButton />

                    <DrawerHeader>
                        <h2 className="text-3xl">
                            {categorySelected?.name || "Nova Categoria"}
                        </h2>
                    </DrawerHeader>

                    <DrawerBody className="mt-5">
                        <form className="space-y-5">
                            <FormControl isInvalid={!!errors.name}>
                                <FormLabel>Nome</FormLabel>
                                <Input type="text" placeholder='Digite o nome da categoria' {...register("name")} />
                                {errors.name && <FormErrorMessage >{errors.name.message}</FormErrorMessage>}
                            </FormControl>

                            <FormControl isInvalid={!!errors.backgroundColor}>
                                <FormLabel>Cor de Fundo</FormLabel>
                                <Input type="color" placeholder='Selecione a cor de fundo do cartão' {...register("backgroundColor")} defaultValue="#ffffff"/>
                                {errors.backgroundColor && <FormErrorMessage >{errors.backgroundColor.message}</FormErrorMessage>}
                            </FormControl>

                            <FormControl isInvalid={!!errors.textColor}>
                                <FormLabel>Cor do Texto</FormLabel>
                                <Input type="color" placeholder='Selecione a cor de texto do cartão' {...register("textColor")} defaultValue="#000000"/>
                                {errors.textColor && <FormErrorMessage >{errors.textColor.message}</FormErrorMessage>}
                            </FormControl>
                        </form>

                        <div className="mt-10">
                            <span className="">Exemplo de cartão de tarefa:</span>

                            <div className="w-56 h-64 p-3 mt-2 flex flex-col border rounded shadow-md" style={{ backgroundColor: watchFormValue("backgroundColor"), color: watchFormValue("textColor") }}>
                                <span className="font-bold">Titulo da Tarefa</span>
                                <span className="text-sm">Data de início - Data de fim</span>

                                <span className="mt-3 text-sm">Decrição da tarefa...</span>
                            </div>
                        </div>
                    </DrawerBody>

                    <DrawerFooter>
                        <ButtonGroup>
                            <Button type="button" onClick={handleCloseForm}>Fechar</Button>
                            {!categorySelected && <Button type="button" onClick={handleSubmit(handleSaveCategory)}>Salvar</Button>}
                            {categorySelected && <Button type="button" onClick={openConfirmUpdateModal}>Atualizar</Button>}
                            {categorySelected && <Button type="button" onClick={openConfirmDeleteModal}>Deletar</Button>}
                        </ButtonGroup>
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>

            {openConfirmModal && <ConfirmModal isOpen={openConfirmModal} setIsOpen={setOpenConfirmModal} headerText={confirmModalConfig!.headerText} bodyText={confirmModalConfig!.bodyText} callback={confirmModalConfig!.callback}/>}
            {openNotificationModal && <NotificationModal openModal={openNotificationModal} setOpenModal={setOpenNotificationModal} bodyText={notificationModalText} />}
            {openLoadingModal && <LoadingModal openModal={openLoadingModal} setOpenModal={setOpenLoadingModal}/>}
        </>
    )
}