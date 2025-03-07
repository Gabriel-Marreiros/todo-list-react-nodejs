import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TaskForm } from "../components/TaskForm";
import { Login } from "../pages/Auth/Login";
import { RegisterPage } from "../pages/Auth/Register";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Dashboard/Home";
import { TaskCalendar } from "../pages/Dashboard/TaskCalendar";
import { Tasks } from "../pages/Dashboard/Tasks";
import { TasksWall } from "../pages/Dashboard/TasksWall";
import { ProtectedRoute } from "./protectedRoute";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

                    <Route path="/tasks-wall" element={<ProtectedRoute><TasksWall /></ProtectedRoute>}>
                        <Route path="new-task" element={<TaskForm />} />
                        <Route path=":taskId" element={<TaskForm />} />
                    </Route>

                    <Route path="/calendar" element={<ProtectedRoute><TaskCalendar /></ProtectedRoute>}>
                        <Route path="new-task" element={<TaskForm />} />
                        <Route path=":taskId" element={<TaskForm />} />
                    </Route>

                    <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>}>
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