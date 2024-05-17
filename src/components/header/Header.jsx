import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import logo from '../../assets/img/logo.svg';
import { SearchContext } from '../../contexts/SearchContext.jsx';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { BoxArrowRight, GearFill, Search } from "react-bootstrap-icons";
import { Col } from "react-bootstrap";

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function Header() {
    const [search, setSearch] = useState("");
    const { events, getAllEvents } = useContext(SearchContext);
    const [event, setEvent] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = events.filter(event =>
            removeAccents(event.nome.toLowerCase()).includes(removeAccents(search.toLowerCase()))
        );
       console.log(filtered)
        setFilteredEvents(filtered);
    }, [events, search]);

    const handleBurgerClick = () => {
        setMenuOpen(!menuOpen);
    };

    const handleRegister = () => {
        navigate("/register");
    };

    const handleSearch = async () => {
        console.log('teste')
        await getAllEvents();
    };

    const handleLogin = () => {
        setAdmin(true);
        navigate("/login");
    };

    const handleLogout = () => {
        setAdmin(false);
    };

    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/"><Image src={logo} fluid /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={handleBurgerClick} />
                    <Navbar.Collapse id="navbarScroll" className={menuOpen ? 'show' : ''}>
                        {admin ? (
                            <>
                                <Nav className="me-auto my-2 my-lg-0">
                                    <Nav.Link as={Link} to="/">Crie seu Evento</Nav.Link>
                                    <Nav.Link as={Link} to="/categories">Categorias</Nav.Link>
                                    <Nav.Link as={Link} to="/settings" className={"link-underline-opacity-0-hover"}>
                                        Bem Vindo, Organizador
                                    </Nav.Link>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Pesquisar Eventos"
                                        className="me-2"
                                        aria-label="Search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <Button variant="outline-primary"
                                            type="button"
                                            className='me-2'
                                            onClick={handleSearch}>
                                        <Search />
                                    </Button>
                                    <Button variant="secondary" className=' me-2' onClick={handleLogout}>
                                        <BoxArrowRight />
                                    </Button>
                                    <Button as={Link} className={'text-black  '}
                                            to="/settings" variant='warning'>
                                        <GearFill />
                                    </Button>
                                </Form>
                            </>
                        ) : (
                            <>
                                <Nav className="me-auto my-2 my-lg-0">
                                    <Nav.Link as={Link} to="/">Crie seu Evento</Nav.Link>
                                    <Nav.Link onClick={handleLogin}>Login</Nav.Link>
                                    <Col xs="auto" sm='auto'>
                                        <Button variant="primary" onClick={handleRegister}>Cadastre-se</Button>
                                    </Col>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Pesquisar Eventos"
                                        className="me-2 "
                                        aria-label="Search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <Button variant="outline-primary" type="button"
                                            onClick={handleSearch}>
                                        <Search />
                                    </Button>
                                </Form>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
