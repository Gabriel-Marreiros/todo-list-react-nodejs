import { Button, ButtonGroup, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDeleteCategory } from "../../hooks/categories/useDeleteCategory";
import { useSaveCategory } from "../../hooks/categories/useSaveCategory";
import { useUpdateCategory } from "../../hooks/categories/useUpdateCategory";
import { ICategory } from "../../types/interfaces/ICategory";

interface CategoryFormProps {
    openForm: boolean,
    setOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    categorySelected: ICategory | null
}

const categoryFormSchema = z.object({
    id: z
        .string()
        .optional(),
    name: z
        .string()
        .nonempty("A categoria precisa ter um nome"),
    backgroundColor: z
        .string()
        .nonempty("A categoria precisa ter uma cor de fundo"),
    textColor: z
        .string()
        .nonempty("A categoria precisa ter uma cor de texto")
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

export function CategoryForm({ openForm, setOpenForm, categorySelected }: CategoryFormProps) {

    const { handleSubmit, setValue, getValues: getFormValues, reset: resetForm, formState: { errors }, register } = useForm<CategoryFormData>({ resolver: zodResolver(categoryFormSchema) });

    const { mutate: saveCategory } = useSaveCategory();
    const { mutate: updateCategory } = useUpdateCategory();
    const { mutate: deleteCategory } = useDeleteCategory();

    const handleSaveCategory = (categoryData: CategoryFormData): void => {
        saveCategory(categoryData, {
            onSuccess: () => {
                handleCloseForm();
            },

            onError: (error) => {
                console.log(error);
            }
        })
    }

    const handleUpdateCategory = (categoryData: CategoryFormData): void => {
        updateCategory(categoryData, {
            onSuccess() {
                handleCloseForm();
            },

            onError: (error) => {
                console.log(error);
            }
        });
    }

    const handleDeleteCategory = (): void => {
        const categoryId: string | undefined = getFormValues("id");

        if (!categoryId) {
            return;
        }

        deleteCategory(categoryId, {
            onSuccess: () => {
                handleCloseForm();
            },

            onError: (error) => {
                console.log(error);
            }
        });
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
                                <Input type="color" placeholder='Selecione a cor de fundo do cartão' {...register("backgroundColor")} />
                                {errors.backgroundColor && <FormErrorMessage >{errors.backgroundColor.message}</FormErrorMessage>}
                            </FormControl>

                            <FormControl isInvalid={!!errors.textColor}>
                                <FormLabel>Cor do Texto</FormLabel>
                                <Input type="color" placeholder='Selecione a cor de texto do cartão' {...register("textColor")} />
                                {errors.textColor && <FormErrorMessage >{errors.textColor.message}</FormErrorMessage>}
                            </FormControl>
                        </form>
                    </DrawerBody>

                    <DrawerFooter>
                        <ButtonGroup>
                            <Button type="button" onClick={handleCloseForm}>Fechar</Button>
                            {!categorySelected && <Button type="button" onClick={handleSubmit(handleSaveCategory)}>Salvar</Button>}
                            {categorySelected && <Button type="button" onClick={handleSubmit(handleUpdateCategory)}>Atualizar</Button>}
                            {categorySelected && <Button type="button" onClick={handleDeleteCategory}>Deletar</Button>}
                        </ButtonGroup>
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>

        </>


        // <AsideForm.Root title="Categoria" openForm={openForm} setOpenForm={setOpenForm} form={form}>
        //     <AsideForm.Form onSubmit={handleSaveCategory}>
        //         <AsideForm.FormControl>
        //             <AsideForm.Label>Nome</AsideForm.Label>
        //             <AsideForm.Input type="string" field="name" />
        //         </AsideForm.FormControl>

        //         <AsideForm.FormControl>
        //             <AsideForm.Label>Cor</AsideForm.Label>
        //             <AsideForm.Input type='color' field="name" />
        //         </AsideForm.FormControl>
        //     </AsideForm.Form>

        //     <AsideForm.ButtonGroup>
        //         <Button type="button" onClick={handleCloseForm}>Cancelar</Button>
        //         <Button type="submit" form="categoryForm">Salvar</Button>
        //     </AsideForm.ButtonGroup>
        // </AsideForm.Root>

    )
}