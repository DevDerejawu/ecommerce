import { createContext, useState, useContext, useEffect } from 'react';
const NotificationContext = createContext();
export const NotificationProvider = ({ children }) => {
  const [popUpMessage, setPopUpMessage] = useState(null);

  const showPopUpMessage = (message, type = 'success') => {
    setPopUpMessage({ message, type });
  };

  useEffect(() => {
    if (popUpMessage) {
      const timer = setTimeout(() => setPopUpMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [popUpMessage]);

  return (
    <NotificationContext.Provider value={{ showPopUpMessage, Spinner }}>
      {children}
      {popUpMessage && <PopUpMessages message={popUpMessage.message} type={popUpMessage.type} />}
    </NotificationContext.Provider>
  );
};

export const usePopUpMessage = () => useContext(NotificationContext);
function Spinner () {
  return(
  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
)};
function PopUpMessages ({ message, type }) {
  const isError = type === 'error';
  return (
    <div className={`fixed top-5 right-5 min-w-[280px] shadow-xl rounded-md overflow-hidden z-[100] animate-fade-in
      ${isError ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
      
      <div className="p-4 font-medium">{message}</div>

  
      <div className="absolute bottom-0 left-0 h-1 w-full bg-black/10">
        <div className={`h-full animate-progress-bar ${isError ? 'bg-red-500' : 'bg-green-500'}`} />
      </div>
    </div>
  );
};
