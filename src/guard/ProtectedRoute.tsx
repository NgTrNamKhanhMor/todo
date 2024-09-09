
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '~/redux/store';
import { selectCurrentUserId } from '~helpers/user';

const ProtectedRoute: React.FC = () => {
    const currentUserId = selectCurrentUserId();

    if (!currentUserId) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
