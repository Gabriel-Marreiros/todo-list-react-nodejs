import { Button, IconButton } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaCalendarAlt, FaHome, FaStickyNote, FaTasks } from "react-icons/fa";
import { FaSheetPlastic } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useListCategories } from "../../hooks/categories/useListCategories";
import { CategoryForm } from "../CategoryForm";
import { NavButton } from "./NavButton";
import { NavGroup } from "./NavGroup";
import { NavLink } from "./NavLink";
import { ICategory } from "../../types/interfaces/ICategory";
import { ConfirmModal } from "../ConfirmModal";

export function Navbar() {
    const [openCategoryForm, setOpenCategoryForm] = useState<boolean>(false);
    const selectedCategoryRef = useRef<ICategory | null>(null);

    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
    const [confirmModalConfig, setConfirmModalConfig] = useState<{headerText: string, bodyText: string, callback: VoidFunction}>();

    const { data: categories } = useListCategories();

    const sideMenuRef = useRef<HTMLElement>(null);
    const menuBackdropRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const handleOpenCategoryForm = (category?: ICategory): void => {
        selectedCategoryRef.current = null;

        if(category){
            selectedCategoryRef.current = category;
        }

        setOpenCategoryForm(true);
    }

    const handleLogout = (): void => {
        const accessTokenName: string = import.meta.env.VITE_ACCESS_TOKEN_NAME;
        localStorage.removeItem(accessTokenName);

        navigate("/login");
    }

    const openConfirmLogoutModal = () => {
        setOpenConfirmModal(true);
        setConfirmModalConfig({
            headerText: "Sair da conta?",
            bodyText: "Tem certeza que deseja sair da sua conta?",
            callback: handleLogout
        });
    }

    const toggleAsideMenu = (): void => {
        sideMenuRef.current?.classList.toggle("hidden");
        menuBackdropRef.current?.classList.toggle("hidden");
    }

    return (
        <>
            <header className="lg:hidden p-2 h-14 bg-gray-300">
                <IconButton icon={<GiHamburgerMenu />} aria-label="" onClick={toggleAsideMenu} />
            </header>

            <div className="hidden lg:hidden h-screen w-screen fixed top-0 left-0 opacity-50 z-10 bg-black" ref={menuBackdropRef}></div>

            <aside className="fixed top-0 bottom-0 left-0 lg:static w-10/12 sm:w-8/12 md:w-7/12 lg:w-full h-screen hidden lg:block z-20 border-e border-zinc-300 bg-gray-200" ref={sideMenuRef}>

                <div className="h-full flex flex-col px-4 xl:px-7 py-7">
                    <div className="flex justify-between lg:justify-center">
                        <div className="text-center font-bold">
                            <h2 className="text-lg">Todo List</h2>
                            <h3 className="text-lg">React & Node.js</h3>
                        </div>

                        <div className="lg:hidden">
                            <IconButton icon={<IoClose />} aria-label="" onClick={toggleAsideMenu} />
                        </div>
                    </div>

                    <div className="space-y-8 mt-14">
                        <NavGroup title="Tarefas">
                            <NavLink to="/home" icon={FaHome} label="Início" />
                            <NavLink to="/tasks" icon={FaTasks} label="Tarefas" />
                            <NavLink to="/calendar" icon={FaCalendarAlt} label="Calendário" />
                            <NavLink to="/tasks-wall" icon={FaStickyNote} label="Mural de Tarefas" />
                        </NavGroup>

                        <NavGroup title="Categorias">
                            <NavButton onClick={() => handleOpenCategoryForm()} icon={IoIosAdd} label="Nova Categoria" />

                            {
                                categories && categories.map((category, index) => (
                                    <NavButton key={index} icon={FaSheetPlastic} iconColor={category.backgroundColor} label={category.name} onClick={() => handleOpenCategoryForm(category)}/>
                                ))
                            }
                        </NavGroup>
                    </div>

                    <div className="text-center mt-auto">
                        <Button colorScheme="blue" onClick={openConfirmLogoutModal}>Sair da conta</Button>
                    </div>
                </div>

            </aside>

            {openCategoryForm && <CategoryForm openForm={openCategoryForm} setOpenForm={setOpenCategoryForm} categorySelected={selectedCategoryRef.current} />}
            {openConfirmModal && <ConfirmModal isOpen={openConfirmModal} setIsOpen={setOpenConfirmModal} headerText={confirmModalConfig!.headerText} bodyText={confirmModalConfig!.bodyText} callback={confirmModalConfig!.callback}/>}
        </>
    )
}