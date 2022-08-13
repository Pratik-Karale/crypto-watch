import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './pages/MainPage';
import { CurrencyContextProvider } from "./context/currency";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { App } from './App';
import CoinPage from "./pages/CoinPage"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <CurrencyContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App/>}>
                  <Route path="" element={<MainPage/>}/>
                  <Route path=":id" element={<CoinPage/>}/>
                </Route>
              </Routes>
            </BrowserRouter>
        </CurrencyContextProvider>
  </React.StrictMode>
);
