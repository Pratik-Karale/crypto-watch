import { createContext,useState } from 'react';

const CurrencyContext = createContext({});

function CurrencyContextProvider({children}) {
  const [currency, setCurrency] = useState("usd")
  return (
    <CurrencyContext.Provider value={{currency,setCurrency}}>
      {children}
    </CurrencyContext.Provider>
  );
}
export {CurrencyContextProvider,CurrencyContext}