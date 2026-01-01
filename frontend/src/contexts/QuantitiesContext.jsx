import { useContext, createContext } from "react";
import useQuantities from "../components/useQuabtities";

const QuantitiesContext = createContext();

export default function QuantitiesContextProvider({children}){
  const quantitiesData = useQuantities();
 return(
   <QuantitiesContext.Provider value={quantitiesData}>
    {children}
  </QuantitiesContext.Provider>
 )
}

export function useQuantitiesContext() {
  return useContext(QuantitiesContext);
}
