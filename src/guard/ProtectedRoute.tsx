
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '~/redux/store';
import { selectCurrentUser } from '~helpers/user';

const ProtectedRoute: React.FC = () => {
    const currentUser = selectCurrentUser();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
