import { Button } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaCalendarAlt, FaHome, FaStickyNote, FaTasks } from "react-icons/fa";
import { FaSheetPlastic } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useListAllCategories } from "../../hooks/categories/useListAllCategories";
import { ICategory } from "../../types/interfaces/ICategory";
import { CategoryForm } from "../CategoryForm";
import { NavButton } from "./NavButton";
import { NavGroup } from "./NavGroup";
import { NavLink } from "./NavLink";

export function Navbar() {

    const { data: categories } = useListAllCategories();

    const [openForm, setOpenForm] = useState<boolean>(false);

    const navigate = useNavigate();

    const selectedCategoryRef = useRef<ICategory | null>(null);

    const handleOpenCategoryForm = (categorySelected?: ICategory): void => {
        selectedCategoryRef.current = null;

        if (categorySelected?.id) {
            selectedCategoryRef.current = categorySelected;
        }

        setOpenForm(true);
    }

    const handleLogout = (): void => {
        const accessTokenName: string = import.meta.env.VITE_ACCESS_TOKEN_NAME;
        localStorage.removeItem(accessTokenName);

        navigate("/login");
    }

    return (
        <>
            <aside className="h-full px-12 py-7 flex flex-col justify-between">

                <div className="space-y-14">
                    <div className="flex justify-center">
                        <div className="text-center font-bold">
                            <h2 className="text-lg">Todo List</h2>
                            <h3 className="text-lg">React & Node.js</h3>
                        </div>

                        {/* <IconButton icon={<GiHamburgerMenu />} aria-label="" /> */}
                    </div>

                    <div className="space-y-8">

                        <NavGroup title="Tarefas">
                            <NavLink to="home" icon={FaHome} label="Início" count={5} />
                            <NavLink to="tasks" icon={FaTasks} label="Tarefas" />
                            <NavLink to="calendar" icon={FaCalendarAlt} label="Calendário" />
                            <NavLink to="tasks-wall" icon={FaStickyNote} label="Mural de Tarefas" />
                        </NavGroup>


                        <NavGroup title="Categorias">
                            {
                                categories && categories.map((category, index) => (
                                    <NavButton key={index} onClick={() => handleOpenCategoryForm(category)} icon={FaSheetPlastic} iconColor={category.backgroundColor} label={category.name} />
                                ))
                            }

                            <NavButton onClick={handleOpenCategoryForm} icon={IoIosAdd} label="Nova Categoria" />
                        </NavGroup>

                    </div>

                </div>

                <div className="text-center">
                    <Button onClick={handleLogout}>Sair da conta</Button>
                </div>

            </aside>

            <CategoryForm openForm={openForm} setOpenForm={setOpenForm} categorySelected={selectedCategoryRef.current} />
        </>

    )
}