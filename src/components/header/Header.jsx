import {useContext, useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { findAllEvents } from "../../services/eventService.jsx";
import './Header.css';
import logo from '../../assets/img/logo.svg';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { BoxArrowRight, GearFill, Search } from "react-bootstrap-icons";
import { Col } from "react-bootstrap";
import {AuthContext} from "../../context/AuthContext.jsx";

export default function Header() {
    const [search, setSearch] = useState("");
    const [eventRender, setEventRender] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const {userLogged, logoutUser} = useContext(AuthContext);

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
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/"><Image src={logo} fluid /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={handleBurgerClick} />
                    <Navbar.Collapse id="navbarScroll" className={menuOpen ? 'show' : ''}>
                        {userLogged ? (
                            <>
                                <Nav className="me-auto my-2 my-lg-0">
                                    <Nav.Link as={Link} to="/create/event">Crie seu Evento</Nav.Link>
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

                                    <Button variant="secondary" className=' me-2'

                                             onClick={() => logoutUser()} >
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
                                    <Nav.Link as={Link} to="/create/event">Crie seu Evento</Nav.Link>
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
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