import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserMain from './store/usermain';
import SubjectStore from './store/SubjectStore';
import MethodStore from './store/MethodStore';

const userStore = new UserMain();
const subjectStore = new SubjectStore();
const methodStore = new MethodStore();

export const Context = createContext({
    user: userStore,
    subject: subjectStore,
    method: methodStore,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{ 
    user: userStore,
    subject: subjectStore,
    method: methodStore
  }}>
    <App />
  </Context.Provider>
);

reportWebVitals();
