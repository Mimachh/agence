"use client"
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface NotificationContextProps {
  showNotification: (message: string, status?: "success" | "error", title?: string) => void;
  notification: string | null;
  status: "success" | "error" | null; // Ajoutez cette ligne
  title: string | null; // Ajoutez cette ligne
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<string | null>(null);
  const [status, setStatus] = useState<"success" | "error" | null>(null); // Initialisez à null
  const [title, setTitle] = useState<string | null>(null); // Initialisez à null

  const showNotification = (message: string, status: "success" | "error" = "success", title: string | null = null) => {
    setNotification(message);
    setStatus(status);
    setTitle(title);

    // Cacher la notification après un certain délai
    setTimeout(() => {
      setNotification(null);
      setStatus(null);
      setTitle(null);
    }, 4500); // Cacher après 5 secondes (ajustez selon vos besoins)
    
  };

  // Effacez la notification après chaque changement de notification
  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        setNotification(null);
        setStatus(null);
        setTitle(null);

      }, 4500); // Cacher après 5 secondes (ajustez selon vos besoins)

      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ showNotification, notification, status, title }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};