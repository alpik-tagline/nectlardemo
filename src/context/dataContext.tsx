import {createContext, useContext, useState} from 'react';

export const dataContext = createContext(null);

export const CounterProvider = ({children}) => {
  const [data, setData] = useState([]);

  const addtoCart = item => {
    setData([...data, item]);
  };

  return (
    <dataContext.Provider value={{data, setData, addtoCart}}>
      {children}
    </dataContext.Provider>
  );
};

export const useCart = () => useContext(dataContext);
