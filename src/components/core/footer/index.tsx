import { FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa"
import "./footer.css"

export const Footer = () => {
    return (
        <footer className="container-footer">
            <div className="div-footer">
                <p>Siguenos en nuestras redes sociales</p>
                <div className="icons-footer">
                    <FaTwitter className="icons-sizes" />
                    <FaInstagram className="icons-sizes" />
                    <FaTiktok className="icons-sizes"/>
                </div>
                <p>@2024 NNT Market. Todos los derechos reservados.</p>
                <p>Politica de Privacidad | Termnis de uso | Contacto</p>
            </div>
        </footer>
    )
}
