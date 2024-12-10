import React, { createContext, useState, useEffect } from 'react';
import SubjectStore from '../store/SubjectStore';
import UserStore from '../store/UserStore'; // Предположим, что у вас есть UserStore

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [subject] = useState(new SubjectStore());
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedIsAuth = localStorage.getItem('isAuth');
    if (storedUser && storedIsAuth) {
      setUser(JSON.parse(storedUser));
      setIsAuth(JSON.parse(storedIsAuth));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuth', JSON.stringify(isAuth));
  }, [user, isAuth]);

  return (
    <Context.Provider value={{ subject, user, setUser, isAuth, setIsAuth }}>
      {children}
    </Context.Provider>
  );
};
