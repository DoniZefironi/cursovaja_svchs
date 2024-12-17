import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserMain from './store/usermain';
import SubjectStore from './store/SubjectStore';
import MethodStore from './store/MethodStore';
import SyllabusStore from './store/syllabusstore';
import UserStore from './store/userstore';
import SpecialityStore from './store/SpecialityStore'; 

const userStore = new UserMain();
const subjectStore = new SubjectStore();
const methodStore = new MethodStore();
const syllabusStore = new SyllabusStore();
const authorStore = new UserStore();
const specialityStore = new SpecialityStore(); 

export const Context = createContext({
    user: userStore,
    subject: subjectStore,
    method: methodStore,
    syllabus: syllabusStore,
    author: authorStore,
    specialityMethod: specialityStore, 
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{ 
    user: userStore,
    subject: subjectStore,
    method: methodStore,
    syllabus: syllabusStore,
    author: authorStore,
    specialityMethod: specialityStore, 
  }}>
    <App />
  </Context.Provider>
);

reportWebVitals();
