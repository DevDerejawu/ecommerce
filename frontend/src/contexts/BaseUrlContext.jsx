import { createContext } from "react";
export const BaseUrlContext = createContext(null);
const  baseUrl= "https://ecommerce-xni1.onrender.com";
function BaseUrlContextProvider({ children }) {
  return (
    <BaseUrlContext.Provider value={{ baseUrl }}>
      {children}
    </BaseUrlContext.Provider>
  );
}
export default BaseUrlContextProvider;
