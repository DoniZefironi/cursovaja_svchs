import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'; 
import AppRouter from './components/AppRouter';
import Header from './components/header';
import Footer from './components/footer';
import LoginPage from './pages/Auth';

const App = () => {
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
};

const Layout = () => (
  <>
    <Header />
    <Outlet /> {}
    <Footer />
  </>
);

export default App;
