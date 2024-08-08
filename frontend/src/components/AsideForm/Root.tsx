import { Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface RootProps {
    form: UseFormReturn<any, any, any>
    openForm: boolean
    setOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    children: ReactNode | ReactNode[]

}

export function Root({form, openForm, setOpenForm, title, children}: RootProps){

    const handleCloseForm = () => {
        setOpenForm(false)
    }

    return (
        <FormProvider {...form} >
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
                            {title}
                        </h2>
                    </DrawerHeader>

                    {children}

                </DrawerContent>
                
            </Drawer>
        </FormProvider>
    )
}