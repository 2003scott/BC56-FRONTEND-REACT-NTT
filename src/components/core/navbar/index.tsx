import { TiShoppingCart } from "react-icons/ti"
import "./navbar.css"
import { useCart } from "@/hooks/useCart"
import { Link } from "react-router-dom"

export const Navbar = () => {

    const { cart } = useCart()

    return (
        <nav className="nav-container">
            <Link to={"/"} className="nav-div">
                <img className="navbar-image" src="/images/logo.avif" alt="logo" width="75" height="75" />
                <h2 className="">NTT market</h2>
            </Link>
            <Link to={"/resuman"} className="nav-carrito" style={{ position : "relative"}}>
                <TiShoppingCart style={{ height : 30, width : 30}} />
                <div className="nav-badge">{cart.length}</div>
            </Link>
        </nav>
    )
}
