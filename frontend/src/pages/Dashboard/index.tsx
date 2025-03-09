import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export function Dashboard() {
    return (
        <div className="min-h-screen grid">
            <div className="w-full lg:w-2/12 sticky top-0 lg:fixed z-10">
                <Navbar />
            </div>

            <main className="w-full lg:w-10/12 justify-self-end bg-gray-50">
                <Outlet />

                <Footer />
            </main>
        </div>
    )
}