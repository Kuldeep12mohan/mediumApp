import { createContext, useState, ReactNode } from 'react';

interface MyContextType {
  logout: boolean;
  showLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

interface MyProviderProps {
  children: ReactNode;
}

const MyProvider = ({ children }: MyProviderProps) => {
  const [logout, showLogout] = useState(false);
  
  return (
    <MyContext.Provider value={{ logout, showLogout }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };