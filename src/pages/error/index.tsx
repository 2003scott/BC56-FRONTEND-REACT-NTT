import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import './error.css'
import { route } from '@/routes'

export const ErrorPage = ({ mensaje } : { mensaje : string}) => {
    return (
        <section className="not-found-container">
            <div className="container-error">
                <div className="not-found-content">
                    <div className="image-container">
                        <div className="not-found-image-container">
                            <h1 className="not-found-title">404 | Not Found</h1>
                        </div>
                        <div className="not-found-inner">
                            <div className="not-found-logo">
                                <img src="/images/logo.avif" alt="logo" />
                            </div>
                            <h3 className="not-found-subtitle">
                                {mensaje}
                            </h3>
                            <p className="not-found-text">¡Algo salio mal!</p>
                            <Link to={route.home}>
                                <Button>
                                    Volver al Inicio
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
