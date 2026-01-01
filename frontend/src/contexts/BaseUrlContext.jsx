import { createContext } from "react";
export const BaseUrlContext = createContext(null);
const  baseUrl= "http://localhost:4000"
function BaseUrlContextProvider({ children }) {
  return (
    <BaseUrlContext.Provider value={{ baseUrl }}>
      {children}
    </BaseUrlContext.Provider>
  );
}
export default BaseUrlContextProvider;
