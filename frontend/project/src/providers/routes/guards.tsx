import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/Loading";
import type { ReactNode } from "react";

export const RequireAuth = () => {
    const { session, loading } = useAuth();
    if (loading) return <Loading />;
    if (!session) return <Navigate to="/auth" replace />;
    return <Outlet />;
};

export const RedirectIfAuthenticated = ({
    children,
}: {
    children: ReactNode;
}) => {
    const { session, loading } = useAuth();
    if (loading) return null;
    if (session) return <Navigate to="/discover/music" replace />;
    return children;
};
