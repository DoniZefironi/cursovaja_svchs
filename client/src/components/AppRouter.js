import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { adminRoutes, authRoutes, publicRoutes } from '../routes'; 
import { useContext } from 'react';
import { Context } from '../index';
import { MAIN_ROUTE } from '../utils/consts'; 

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
            <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
