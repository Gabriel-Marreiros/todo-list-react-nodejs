import { Divider } from "@chakra-ui/react";

interface PageTitleProps {
    title: string
}

export function PageTitle({ title }: PageTitleProps) {

    return (
        <>
            <h2 className="text-4xl">{title}</h2>
            <Divider className="mt-6 mb-10" />
        </>
    )

}