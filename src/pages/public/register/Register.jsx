import { useEffect, useState } from "react"
import { findAllRoles } from "../../../services/roleService"
import { createUser } from "../../../services/userService"
import { useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { EnvelopeAt, Lock, Telephone, TextareaT } from "react-bootstrap-icons";

import MaskedInput from "react-text-mask"

export default function Register() {
    // Informações dos usuários.
    const [nome, setName] = useState("")
    const [telefone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setPassword] = useState("")
    const [cargo_id, setRole] = useState("")

    const [roles, setRoles] = useState([]) // Lista com os cargos do site.

    const [showMessage, setShowMessage] = useState("")
    const [verifyErrorEmail, setVerifyErroEmail] = useState({ class: "", message: "" })

    // Funções para mostras as mensagens.
    const handleCloseMessage = () => navigate("/login") // Manda o usuário cadastrado para o login.
    const handleShowMessage = (message) => setShowMessage(message)

    const navigate = useNavigate()

    // Função para determinar a máscara do telefone com base no valor atual
    const getMask = (telefone) => {
        return telefone.length >= 6 && telefone[5] === "9"
            ? ["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]
            : ["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]
    }

    // Função para buscar os cargos.
    const getRoles = async () => {
        try {
            const res = await findAllRoles()
            setRoles(res || [])
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getRoles()
    }, [])

    // Função que retorna o erro no Email.
    const verifyEmail = (verify) => {
        if (verify) {
            setVerifyErroEmail({ class: "is-invalid", message: "Este email já está registrado." })
        } else {
            setVerifyErroEmail({ class: "", message: "" })
        }
    }

    // Função de envio do formulário.
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            verifyEmail(false)
            await createUser({ nome, email, telefone, senha, cargo_id })
            handleShowMessage("Conta criada com sucesso!")
        } catch (error) {
            if (error.message.includes("409")) {    // ERROR: Email já cadastrado.
                verifyEmail(true)
            } else {
                console.error(error.message)
            }
        }
    }

    return (
        <section>
            <Container>
                <h1 className='titulo'>Cadastre-se</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label><TextareaT /> Nome</Form.Label>
                        <Form.Control type='text' placeholder='Digite seu nome' value={nome} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label><EnvelopeAt /> E-mail</Form.Label>
                        <Form.Control
                            type='email'
                            className={verifyErrorEmail.class}
                            placeholder='Digite email'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                verifyEmail(false)
                            }}
                            required
                        />
                        {verifyErrorEmail.message && <div className='invalid-feedback'>{verifyErrorEmail.message}</div>}
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label><Telephone /> Telefone</Form.Label>
                        <MaskedInput
                            mask={getMask(telefone)}
                            className='form-control'
                            placeholder='Digite seu telefone'
                            value={telefone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label><Lock /> Senha</Form.Label>
                        <Form.Control type='password' minLength='7' placeholder='Digite sua senha' value={senha} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formRadio'>
                        {roles.map(
                            (role) =>
                                role.nome !== "admin" && (
                                    <Form.Check key={role.id} label={role.nome} name='cargo_id' type='radio' id={role.id} value={role.id} onChange={() => setRole(role.id)} required />
                                )
                        )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Button variant='success' type='submit'>
                            Criar
                        </Button>
                    </Form.Group>
                </Form>

                {/*Modal de sucesso*/}
                <Modal show={showMessage} onHide={handleCloseMessage}>
                    <Modal.Header closeButton>
                        <Modal.Title>Mensagem</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{showMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant='success' className='btn-sm' onClick={handleCloseMessage}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </section>
    )
}
