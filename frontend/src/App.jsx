import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FeaturedProducts from "./components/FeaturedProducts";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/confirmationPage";
import TrackingPage from "./pages/TrackingPage";
import RenderSubcategoryProducts from "./components/RenderSubcategoryProducts";
import NotFound from "./components/NotFound";

import OrdersPage from "./pages/OrdersPage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";



function App(){

  const randomRoute = "route_176717332462hhhhhhhhhhhhhhfffffffffvvvvvvvv4-1767173318657-480613543-1767173318657-91989926-1767173318657-889659689-1767173318657-527696932-1767173318657-523634770-1767173318657-926033260";
  const featuredTabInfo = [
    {path: "/new_arrival_products", heading: "New Arrival"},
    {path: "/top_selling_products", heading: "Best Selling"},
    {path: "/top_rated_products", heading: "Top Rated"},
    {path: "/cheap_products", heading: "Cheap Products" },
    {path: "/featured_products", heading: "Featured Products" }

  ]
  
  
  return(
    
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}>
        <Route
        index
        element={<Navigate to="/new_arrival_products" replace />}
      />
       
        {featuredTabInfo.map(({path, heading})=>{
          return   <Route key={path} path={path} element={<FeaturedProducts endpoint={path} heading={heading} />} />
        })}

        <Route path={randomRoute} element={<RenderSubcategoryProducts/>}/>
      </Route>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/payment" element={<PaymentPage/>}/>
        <Route path="/detail-page/:id" element={<ProductDetail/>}/>
        <Route path="/order/:orderId" element={<ConfirmationPage />}/>
        <Route path="/order/:orderId/tracking" element={<TrackingPage />} />
        <Route path="/orders" element={<OrdersPage/>}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/login" element={<AuthPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer/>
   
   </> 
  )
}

export default App;