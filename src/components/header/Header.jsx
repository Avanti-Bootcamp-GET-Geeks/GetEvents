import {useContext, useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import logo from '../../assets/img/logo.svg';
import "./Header.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import {BoxArrowRight, GearFill, PinMap, Tag} from "react-bootstrap-icons";
import {Col, NavDropdown, Row} from "react-bootstrap";
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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <div className="p-2">
            <Image src={logo}/>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">

          {userLogged ? (
            <>
              <Form>
                <Row className="m-auto">
                  <Col md={5} xs={12} className="">
                    <label className="labelSearch">
                      <Tag className="icon-search"/> <Form.Select name="categoria_id"
                                                                  id="categoria"
                                                                  value={fieldValue.categoria_id}
                                                                  onChange={handleChange}
                                                                  aria-label="Categorias"
                    >
                      <option value="">Todas</option>
                      {categories.map(category => (
                        <option value={category.id} key={category.id}>{category.nome}</option>
                      ))}
                    </Form.Select>
                    </label>
                  </Col>

                  <Col md={7} xs={12}>
                    <label className="labelSearch">
                      <PinMap className="icon-search"/>
                      <Form.Select
                        name="local_id"
                        id="local"
                        value={fieldValue.local_id}
                        onChange={handleChange}
                        aria-label="Local"
                      >

                        <option value="">Qualquer lugar</option>
                        {locals.map(local => (
                          <option value={local.id} key={local.id}>{local.nome}</option>
                        ))}

                      </Form.Select>

                    </label>
                  </Col>
                </Row>
              </Form>

              <Row className="col-lg-6 p-2 ms-auto">
                <Col md={6} xs={10}>
                  <div className="">
                    <Nav className="me-auto">
                      <NavDropdown title="Menu">
                        <NavDropdown.Item as={Link} to="/create/event">Crie seu Evento</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item as={Link} to="/my-events">Meus Eventos</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item as={Link} to="/categories">Categorias</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item as={Link} to="/roles">Cargos</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </div>
                </Col>
                <Col md={6} xs={2} className="">
                  <div className="d-flex justify-content-end align-content-center">
                    <Button as={Link}
                            to="/settings"
                            className={' ms-auto text-black'}
                            variant='warning'>
                      <GearFill/>
                    </Button>
                    <Button
                      className={'ms-2'}
                      variant="secondary"
                      onClick={() => logoutUser()}>
                      <BoxArrowRight/>
                    </Button>
                  </div>
                </Col>
              </Row>

            </>
          ) : (

            <>
              <Form>
                <Row className="m-auto">
                  <Col md={5} xs={12} className="">
                    <label className="labelSearch">
                      <Tag className="icon-search"/> <Form.Select name="categoria_id"
                                                                  id="categoria"
                                                                  value={fieldValue.categoria_id}
                                                                  onChange={handleChange}
                                                                  aria-label="Categorias"
                    >
                      <option value="">Todas</option>
                      {categories.map(category => (
                        <option value={category.id} key={category.id}>{category.nome}</option>
                      ))}
                    </Form.Select>
                    </label>
                  </Col>

                  <Col md={7} xs={12}>
                    <label className="labelSearch">
                      <PinMap className="icon-search"/>
                      <Form.Select
                        name="local_id"
                        id="local"
                        value={fieldValue.local_id}
                        onChange={handleChange}
                        aria-label="Local"
                      >

                        <option value="">Qualquer lugar</option>
                        {locals.map(local => (
                          <option value={local.id} key={local.id}>{local.nome}</option>
                        ))}

                      </Form.Select>
                    </label>
                  </Col>
                </Row>
              </Form>


              <Row className="col-ms-6 ms-auto">
                <Col>
                  <div className="p-2 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between w-100">
                    <Nav className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
                      <Nav.Link as={Link} to="/create/event" className="mb-2 mb-md-0 me-md-2 text-center text-md-start">Crie seu Evento</Nav.Link>
                      <Nav.Link as={Link} to="/login" className="mb-2 mb-md-0 me-md-2 text-center text-md-start">Login</Nav.Link>
                    </Nav>
                    <Button variant="outline-primary" onClick={handleRegister} className="mb-2 mb-md-0 ms-md-auto">Cadastre-se</Button>
                  </div>
                </Col>
              </Row>

            </>

          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}