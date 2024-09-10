
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetCurrentUserId } from '~/hooks/useGetCurrentUserId';

const ProtectedRoute: React.FC = () => {
    const currentUserId = useGetCurrentUserId();

    if (!currentUserId) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
