
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import BaseUrlContextProvider from './contexts/BaseUrlContext.jsx'
import CartContextProvider from './contexts/CartContext.jsx'
import SubcategoryIdProvider from './contexts/SubcategoryIdContext.jsx'
import QuantitiesContextProvider from './contexts/QuantitiesContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    
      <BaseUrlContextProvider>
     <CartContextProvider>
    <SubcategoryIdProvider>
    <QuantitiesContextProvider>
      <App />
      </QuantitiesContextProvider>
    </SubcategoryIdProvider>
    </CartContextProvider> 
    </BaseUrlContextProvider>
      
    </BrowserRouter>
)
