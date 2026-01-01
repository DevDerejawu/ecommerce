
import { useState } from "react";
import SearchInputModal from "./navbarSubComponents/SearchInputModal";
import CartIcon from "./navbarSubComponents/CartIcon";
import MiddleNavbar from "./navbarSubComponents/MiddleNavbar";
import LogoForNavbar from "./navbarSubComponents/LogoForNavbar";
import ProductsDropdown from "./ProductsDropdown";

function Navbar() {
  const [openMobileCategory, setOpenMobileCategory] = useState(false);
  return (<>
    <nav className="w-full bg-blue-300 sticky top-0 z-60">
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between py-3">
        <LogoForNavbar />
        <MiddleNavbar setOpenMobileCategory= {setOpenMobileCategory} />
        <SearchInputModal />
        <CartIcon />
      </div>
    </nav>
     
    <ProductsDropdown
    key={Math.random()}
    openMobileCategory={openMobileCategory}
    setOpenMobileCategory={setOpenMobileCategory}
  />

    </>
  );
}

export default Navbar;
