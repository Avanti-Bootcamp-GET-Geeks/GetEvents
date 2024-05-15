import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Header.css';
import logo from '../../assets/img/logo.svg';
import { findAllEvents } from "../../services/eventService.jsx";

export default function Header() {
    const [search, setSearch] = useState("");
    const [eventRender, setEventRender] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [settings, setSettings] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = eventRender.filter((event) =>
            Object.values(event).some((value) =>
                value.toString().toLowerCase().includes(search.toLowerCase())
            )
        );
        if (filtered.length !== eventRender.length) {
            setEventRender(filtered);
        }
    }, [eventRender, search]);


    const handleRegister = () => {
        navigate("/register");
    };

    const handleBurgerClick = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSearch = () => {
        findAllEvents()
            .then((events) => {
                setEventRender(events);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    };

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
                                    <Link className="nav-link" to="/login">Acesse sua conta</Link>
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
                                <button className="btn btn-outline-primary" type="button"
                                        onClick={handleSearch}>Pesquisar
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarToggler">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Crie seu Evento</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/settings">Bem vindo, ORGANIZADOR </Link>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2 search-input" type="search"
                                       placeholder="Pesquisar Eventos"
                                       aria-label="Pesquisar" onChange={e => setSearch(e.target.value)}/>
                                <button className="btn btn-outline-primary" type="button"
                                        onClick={handleSearch}>Pesquisar
                                </button>
                            </form>
                        </div>

                    )}
                </div>
            </nav>
        </header>
    )
}
