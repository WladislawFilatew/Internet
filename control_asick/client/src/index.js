import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserMainer from './contex/UserMainer';
import InfoMain from './contex/InfoMain';
import Setting from './contex/Setting';
import GrafMainer from './contex/GrafMainer';

export const Context = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserMainer(),
    info: new InfoMain(),
    setting: new Setting(),
    graf: new GrafMainer()
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);


reportWebVitals();
