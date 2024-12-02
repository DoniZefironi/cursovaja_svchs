import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserMain from "./main/usermain"

export const Context = createContext(null);
console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserMain()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

reportWebVitals();
