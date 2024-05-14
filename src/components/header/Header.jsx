import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Header.css';
import logo from '../../assets/img/logo.svg';

export default function Header() {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [settings, setSettings] = useState(false)

    const navigate = useNavigate();

    const handleRegister = () => {
        navigate("/register");
    }

    const handleBurgerClick = () => {
        setMenuOpen(!menuOpen);
    };

    console.log(menuOpen)

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img alt={'Logo Get Eventos'} src={logo}/></Link>
                    <button className="navbar-toggler" type="button" onClick={handleBurgerClick}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {!settings ? (
                        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarToggler">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Crie seu Evento</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/settings">Acesse sua conta</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-primary" onClick={handleRegister}>Cadastre-se
                                    </button>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2 search-input" type="search"
                                       placeholder="Pesquisar Eventos"
                                       aria-label="Pesquisar" onChange={e => setSearch(e.target.value)}/>
                                <button className="btn btn-outline-primary" type="button">Pesquisar</button>
                            </form>
                        </div>
                    ) : (
                        <p className="text-xl-end">Bem vindo, ORGANIZADOR </p>

                    )}
                </div>
            </nav>
        </header>
    )
}
