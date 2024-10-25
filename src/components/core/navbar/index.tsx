import { TiShoppingCart } from "react-icons/ti"
import "./navbar.css"
import { Link } from "react-router-dom"
import { useCart } from "@/context/cart-context"
import { route } from "@/routes"

export const Navbar = () => {

    const { cart } = useCart()

    return (
        <nav className="nav-container">
            <Link to={route.home} className="nav-div">
                <img className="navbar-image" src="/images/logo.avif" alt="logo" width="75" height="75" />
                <h2 className="">NTT market</h2>
            </Link>
            <Link to={route.resuman} className="nav-carrito">
                <TiShoppingCart className="icon-nav" />
                <div className="nav-badge">{cart.length}</div>
            </Link>
        </nav>
    )
}
