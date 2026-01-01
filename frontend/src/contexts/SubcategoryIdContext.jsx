import { createContext, useState } from "react";
export const SubcategoryIdContext = createContext();
function SubcategoryIdProvider({children}){
  const [subcategoryId, setSubcategoryId] = useState(null);

  return(
    <SubcategoryIdContext.Provider value={{subcategoryId, setSubcategoryId}}>
      {children}
    </SubcategoryIdContext.Provider>
  )
}

export default SubcategoryIdProvider;