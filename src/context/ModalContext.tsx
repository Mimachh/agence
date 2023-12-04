"use client"
import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalContextProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  component: string;
  setComponent: (value: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState("");
  const contextValue: ModalContextProps = {
    open,
    setOpen,
    setComponent,
    component
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

