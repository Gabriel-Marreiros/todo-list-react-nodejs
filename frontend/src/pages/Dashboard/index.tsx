import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

export function Dashboard() {
    return (
        <div className="min-h-screen lg:flex">
            <div className="w-full lg:w-2/12 h-screen sticky top-0 bg-gray-200">
                <Navbar />
            </div>

            <main className="w-full lg:w-10/12">
                <Outlet />
            </main>
        </div>
    )
}