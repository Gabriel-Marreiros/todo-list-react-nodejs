import { ReactNode, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TaskForm } from "../components/TaskForm";
import { useAuthenticateToken } from "../hooks/auth/useAuthenticateToken";
import { Login } from "../pages/Auth/Login";
import { RegisterPage } from "../pages/Auth/Register";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Dashboard/Home";
import { TaskCalendar } from "../pages/Dashboard/TaskCalendar";
import { Tasks } from "../pages/Dashboard/Tasks";
import { TasksWall } from "../pages/Dashboard/TasksWall";

interface ProtectedRouteProps {
    children: ReactNode;
    redirectTo?: string;
}

function ProtectedRoute({ redirectTo, children }: ProtectedRouteProps) {
    const { mutate: authenticateToken } = useAuthenticateToken();
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const accessTokenName: string = import.meta.env.VITE_ACCESS_TOKEN_NAME;
    const token: string = localStorage.getItem(accessTokenName) || "";

    useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
            localStorage.removeItem(accessTokenName);
        }
        else {
            authenticateToken({ token }, {
                onSuccess: (authenticated: boolean) => {
                    if(authenticated){
                        setIsAuthenticated(true);
                    }
                    else{
                        setIsAuthenticated(false);
                        localStorage.removeItem(accessTokenName);
                    }
                }
            });
        }
    }, [token, accessTokenName, authenticateToken]);

    if (!isAuthenticated) {
        return <Navigate to={redirectTo || "/login"} />;
    }

    return <>{children}</>;
}

export function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                    <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="tasks-wall" element={<ProtectedRoute><TasksWall /></ProtectedRoute>}/>
                    <Route path="calendar" element={<ProtectedRoute><TaskCalendar /></ProtectedRoute>}>
                        <Route path="new-task" element={<TaskForm />} />
                        <Route path=":taskId" element={<TaskForm />} />
                    </Route>
                    <Route path="tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>}>
                        <Route path="new-task" element={<TaskForm />} />
                        <Route path=":taskId" element={<TaskForm />} />
                    </Route>
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    )
}