import {useContext, useEffect, useState} from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
// import { findAllEvents } from "../../services/eventService.jsx";
import './Header.css';
import logo from '../../assets/img/logo.svg';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { BoxArrowRight, CalendarEvent, GearFill, PinMap, Search, Tag } from "react-bootstrap-icons";
import { Col } from "react-bootstrap";
import {AuthContext} from "../../context/AuthContext.jsx";
import { SearchContext } from "../../context/SearchContext.jsx";

export default function Header() {

    const {categories, setCategory, locals, setLocalId} = useContext(SearchContext);
    const {userLogged, logoutUser} = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    
    const navigate = useNavigate();

    const [fieldValue, setFieldValue] = useState({
        categoria_id: "",
        local_id: ""
    });
    
    useEffect(()=> {
        setCategory(fieldValue.categoria_id);
        setLocalId(fieldValue.local_id);
    }, [fieldValue])
    

    const handleRegister = () => {
        navigate("/register");
    };

    const handleBurgerClick = () => {
        setMenuOpen(!menuOpen);
    };


    // REFATORADO
    // const handleSearch = (e) => {
    //     e.preventDefault();

    //     const filtered = events.filter(event =>
    //         Object.values(event).some(value => value && value.toString().toLowerCase().includes(search.toLowerCase()))
    //     );
   
    //   filtered.lenght !== 0 ? setEventsFound(filtered) : setEventsFound([]);
    // };

    // const handleChange = (e) => {
    //     setCategory(e.target.value)
    //     setLocalId(e.target.value)
    // }

    const handleChange = (event) => {
        setFieldValue({
        ...fieldValue, 
        [event.target.name]: event.target.value 
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
                                    {/* <Form.Control
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
                                    </Button> */}

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
                                <>
                                    <div className="mb-3"> 
                                    <label htmlFor="categoria" className="form-label"><Tag /> Categoria</label> <br/>
                                        <select name="categoria_id" id="categoria" value={fieldValue.categoria_id} onChange={handleChange} className="form-select" aria-label="Default select example">
                                            <option value="" disabled selected>Selecione uma categoria</option>
                                            <option value="">Todas</option>
                                                {categories.map(category => (
                                                    <option value={category.id} key={category.id}>{category.nome}</option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="mb-3 flex">                    
                                            <label htmlFor="local" className="form-label"><PinMap /> Local</label> <br/>
                                                <select name="local_id" id="local" value={fieldValue.local_id} onChange={handleChange}
                                        className="form-select" aria-label="Default select example">
                                            <option value="" disabled selected>Selecione um local</option>
                                            <option value="">Todos</option>

                                            {locals.map(local => (
                                            <option value={local.id} key={local.id}>{local.nome}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );

}