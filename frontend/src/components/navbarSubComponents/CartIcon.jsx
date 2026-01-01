import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";

function CartIcon() {
  const { cartCount } = useContext(CartContext);
  return (
    <Link to="/cart" className="relative">
      {/* Cart Icon */}
      <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-indigo-500 transition-colors" />

      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
}

export default CartIcon;
