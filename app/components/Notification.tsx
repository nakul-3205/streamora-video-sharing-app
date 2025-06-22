"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
    id: number;
  } | null>(null);

  const showNotification = (message: string, type: NotificationType) => {
    const id = Date.now();
    setNotification({ message, type, id });
    setTimeout(() => {
      setNotification((current) => (current?.id === id ? null : current));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 z-[100]"
          >
            <div className={`rounded-lg px-4 py-3 shadow-lg ${getAlertClass(notification.type)}`}>
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
}

function getAlertClass(type: NotificationType): string {
  switch (type) {
    case "success":
      return "bg-green-500 text-white";
    case "error":
      return "bg-red-600 text-white";
    case "warning":
      return "bg-yellow-500 text-black";
    case "info":
    default:
      return "bg-blue-600 text-white";
  }
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
