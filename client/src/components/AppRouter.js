import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { adminRoutes, authRoutes, publicRoutes } from '../routes'; // Обновите путь
import { useContext } from 'react';
import { Context } from '../index';
import { LOGIN_ROUTE } from '../utils/consts'; // Импортируйте LOGIN_ROUTE

const AppRouter = () => {
    const { user } = useContext(Context);
    const isAuth = user.isAuth;

    return (
        <Routes>
            {isAuth && adminRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
