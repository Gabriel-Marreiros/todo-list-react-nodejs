import { ReactNode, useEffect, useState } from "react";
import { useAuthenticateToken } from "../hooks/auth/useAuthenticateToken";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
    redirectTo?: string;
}

export function ProtectedRoute({ redirectTo, children }: ProtectedRouteProps) {
    const { mutate: authenticateToken, } = useAuthenticateToken();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessTokenName: string = import.meta.env.VITE_ACCESS_TOKEN_NAME;
        const userToken: string = localStorage.getItem(accessTokenName) || "";

        if (!userToken) {
            setIsAuthenticated(false);
            localStorage.removeItem(accessTokenName);
            setIsLoading(false);
        }
        else {
            authenticateToken({ token: userToken }, {
                onSuccess: (authenticated: boolean) => {
                    if (authenticated) {
                        setIsAuthenticated(true);
                    }
                    else {
                        localStorage.removeItem(accessTokenName);
                        setIsAuthenticated(false);
                    }

                    setIsLoading(false);
                },

                onError: () => {
                    localStorage.removeItem(accessTokenName);
                    setIsAuthenticated(false);
                    setIsLoading(false);
                }
            });
        }
    }, [children]);

    if (isLoading) {
        return;
    }

    if (!isAuthenticated) {
        return <Navigate to={redirectTo || "/login"} />;
    }

    return children;
}