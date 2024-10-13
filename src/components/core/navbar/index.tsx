import { TiShoppingCart } from "react-icons/ti"
import "./navbar.css"

export const Navbar = () => {
    return (
        <nav className="nav-container">
            <div className="nav-div">
                <img className="navbar-image" src="/images/logo.avif" alt="logo" width="75" height="75" />
                <h2 className="">NTT market</h2>
            </div>
            <div className="nav-carrito" style={{ position : "relative"}}>
                <TiShoppingCart style={{ height : 30, width : 30}} />
                <div className="nav-badge">0</div>
            </div>
        </nav>
    )
}
