import {useContext, useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import './Header.css';
import logo from '../../assets/img/logo.svg';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import {BoxArrowRight, GearFill, PinMap, Tag} from "react-bootstrap-icons";
import {Col, Row} from "react-bootstrap";
import {AuthContext} from "../../context/AuthContext.jsx";
import {SearchContext} from "../../context/SearchContext.jsx";


export default function Header() {

  const {categories, setCategory, locals, setLocalId} = useContext(SearchContext);
  const {userLogged, logoutUser} = useContext(AuthContext);


  const navigate = useNavigate();

  const [fieldValue, setFieldValue] = useState({
    categoria_id: "",
    local_id: ""
  });

  useEffect(() => {
    setCategory(fieldValue.categoria_id);
    setLocalId(fieldValue.local_id);
  }, [fieldValue])


  const handleRegister = () => {
    navigate("/register");
  };

  const handleChange = (event) => {
    setFieldValue({
      ...fieldValue,
      [event.target.name]: event.target.value
    });
  };


  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/"><Image src={logo} fluid/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">

          {userLogged ? (

            <>
              <Row>
                <Col className={'mt-2 mb-2'}>
                  <Form.Label><Tag/> Categorias</Form.Label>
                  <Form.Select className='flex' name="categoria_id" id="categoria" value={fieldValue.categoria_id}
                               onChange={handleChange} aria-label="Categorias">
                    <option>Selecione uma categoria</option>
                    <option value="">Todas</option>
                    {categories.map(category => (
                      <option value={category.id} key={category.id}>{category.nome}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col className={'mt-2 mb-2'}>
                  <Form.Label><PinMap/> Local</Form.Label>
                  <Form.Select
                    name="local_id"
                    id="local"
                    value={fieldValue.local_id}
                    onChange={handleChange}
                    aria-label="Local"
                  >
                    <option>Selecione uma categoria</option>
                    <option value="">Todos</option>

                    {locals.map(local => (
                      <option value={local.id} key={local.id}>{local.nome}</option>
                    ))}
                  </Form.Select>

                </Col>
              </Row>

              <Nav className="mt-2 ">
                <Col>
                  <Nav.Link as={Link} to="/settings">Bem Vindo, Organizador</Nav.Link>
                </Col>
                <Nav.Link as={Link} to="/create/event" className={'align-items-center'}>Crie seu Evento</Nav.Link>
                <Nav.Link as={Link} to="/categories">Categorias</Nav.Link>
              </Nav>

              <Form className="d-flex mb-2 btn-icons">
                <Button as={Link}
                        to="/settings"
                        className={' me-2'}
                        variant='warning'>
                  <GearFill/>
                </Button>
                <Button variant="secondary"
                        onClick={() => logoutUser()}>
                  <BoxArrowRight/>
                </Button>
              </Form>

            </>

          ) : (
            <>
              <Row>
                <Col className={'mt-2 mb-2'}>
                  <Form.Label><Tag/> Categorias</Form.Label>
                  <Form.Select className='flex' name="categoria_id" id="categoria" value={fieldValue.categoria_id}
                               onChange={handleChange} aria-label="Categorias">
                    <option>Selecione uma categoria</option>
                    <option value="">Todas</option>
                    {categories.map(category => (
                      <option value={category.id} key={category.id}>{category.nome}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col className={'mt-2 mb-2'}>
                  <Form.Label><PinMap/> Local</Form.Label>
                  <Form.Select
                    name="local_id"
                    id="local"
                    value={fieldValue.local_id}
                    onChange={handleChange}
                    aria-label="Local"
                  >
                    <option>Selecione uma categoria</option>
                    <option value="">Todos</option>

                    {locals.map(local => (
                      <option value={local.id} key={local.id}>{local.nome}</option>
                    ))}
                  </Form.Select>

                </Col>
              </Row>
              <Col></Col>

              <Nav className="">
                <Nav.Link as={Link} to="/create/event">Crie seu Evento</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Col xs="auto" sm='auto'>
                  <Button variant="primary" onClick={handleRegister}>Cadastre-se</Button>
                </Col>
              </Nav>
            </>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}