import {
  Navbar as HeroUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext"; 
import { FaShoppingCart } from "react-icons/fa"; 

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const { cart } = useCart(); 

  function logOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <HeroUiNavbar isBordered className="shadow-md">
      {/* اللوجو */}
      <NavbarBrand
        className="cursor-pointer flex items-center gap-2"
        onClick={() => navigate("/")}
      >
        <FaShoppingCart className="text-green-600 text-2xl" />
        <p className="font-bold text-green-600 text-xl">FreshCart</p>
      </NavbarBrand>

      {/* اللينكات */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link className="text-gray-600 hover:text-green-600" onClick={() => navigate("/")}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-gray-600 hover:text-green-600" onClick={() => navigate("/products")}>
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-gray-600 hover:text-green-600" onClick={() => navigate("/categories")}>
            Categories
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-gray-600 hover:text-green-600" onClick={() => navigate("/brands")}>
            Brands
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-gray-600 hover:text-green-600" onClick={() => navigate("/carts")}>
            Carts
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-gray-600 hover:text-green-600" onClick={() => navigate("/wishlist")}>
            Wishlist
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* اليمين */}
      <NavbarContent justify="end" className="flex items-center gap-4">
        {/* أيقونة السلة */}
        <NavbarItem
          className="relative cursor-pointer"
          onClick={() => navigate("/carts")}
        >
          <FaShoppingCart className="text-gray-600 text-2xl" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </NavbarItem>

        {isLoggedIn ? (
          <NavbarItem>
            <Button onPress={logOut} color="danger" variant="flat">
              Sign Out
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Button
                color="default"
                variant="flat"
                onPress={() => navigate("/login")}
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="primary"
                variant="flat"
                onPress={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
          //mmmmmmmmmmm
        )}
      </NavbarContent>
    </HeroUiNavbar>
  );
}
