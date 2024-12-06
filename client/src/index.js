import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserMain from './store/usermain';
import SubjectStore from './store/SubjectStore';

const userStore = new UserMain();
const subjectStore = new SubjectStore();

export const Context = createContext({
    user: userStore,
    subject: subjectStore,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{ 
    user: userStore,
    subject: subjectStore 
  }}>
    <App />
  </Context.Provider>
);

reportWebVitals();
