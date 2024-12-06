import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Header from './components/header';
import Footer from './components/footer';
import LoginPage from './pages/Auth';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { jwtDecode}  from 'jwt-decode';

const App = observer(() => {
    const { user } = useContext(Context);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            user.setUser({
                email: decodedToken.email,
                name: decodedToken.name,
                surname: decodedToken.surname,
            });
            user.setIsAuth(true);
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/*" element={<Layout />}>
                    <Route path="*" element={<AppRouter />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
});

const Layout = () => (
  <>
    <Header />
    <Outlet /> 
    <Footer />
  </>
);

export default App;
