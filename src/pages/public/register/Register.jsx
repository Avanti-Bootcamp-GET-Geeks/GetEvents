import { useEffect, useState } from "react"
import { findAllRoles } from "../../../services/roleService"
import { createUser } from "../../../services/userService"
import { useNavigate } from "react-router-dom"

import InputMask from "react-input-mask" // Módulo para criar input com mascaras

export default function Register() {
    // Informações dos usuários.
    const [nome, setName] = useState("")
    const [telefone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setPassword] = useState("")
    const [cargo, setRole] = useState("")

    const [roles, setRoles] = useState([]) // Lista com os cargos do site.

    const [errorEmail, setErrorEmail] = useState(false) // Boolean para verificar o email.

    const navigate = useNavigate()

    useEffect(() => {
        // Função para buscar a lista de cargos, execultado ao iniciar a página.
        const fetchRoles = async () => {
            try {
                const data = await findAllRoles()
                setRoles(data)
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchRoles()
    }, [])

    // Função para lidar com a mudança de cargos, execultado ao clicar nos radios.
    const handleRoleChange = (roleName) => {
        try {
            const data = roles.find((item) => item.nome.toLowerCase() == roleName.toLowerCase())
            if (data) {
                setRole(data.id) // Definir o cargo do usuário.
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    // Função de envio do formulário.
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorEmail(false)

        const userData = {
            nome,
            email,
            telefone,
            senha,
            cargo_id: cargo,
        }

        try {
            await createUser(userData)
            navigate("/login")
        } catch (error) {
            if (error.message.includes("409")) {
                setErrorEmail(true) // Ativa o erro no input do email.
            } else {
                console.error(error.message)
            }
        }
    }

    return (
        <section>
            <h1 className={"titulo"}>Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='inputName' className='form-label'>
                        Nome
                    </label>
                    <input type='text' className='form-control' id='inputName' placeholder='Digite seu nome' value={nome} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='inputEmail' className='form-label'>
                        Email
                    </label>
                    <input
                        type='email'
                        className={errorEmail ? "form-control is-invalid" : "form-control"}
                        id='inputEmail'
                        placeholder='Digite email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setErrorEmail(false)
                        }}
                        required
                    />
                    <div className='invalid-feedback'>Este email já está registrado.</div>
                </div>
                <div className='mb-3'>
                    <label htmlFor='inputTelefone' className='form-label'>
                        Telefone
                    </label>
                    <InputMask
                        mask={telefone.length >= 6 && telefone[5] === "9" ? "(99) 99999-9999" : "(99) 9999-9999"}
                        maskChar={""}
                        type='text'
                        className='form-control'
                        id='inputTelefone'
                        placeholder='Digite seu telefone'
                        value={telefone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='inputSenha' className='form-label'>
                        Senha
                    </label>
                    <input type='password' minLength='7' className='form-control' id='inputSenha' placeholder='Digite sua senha' value={senha} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className='mb-3 form-check'>
                    <input className='form-check-input' type='radio' name='role' id='organizador' onChange={() => handleRoleChange("organizador")} />
                    <label className='form-check-label' htmlFor='organizador'>
                        Organizador
                    </label>
                </div>

                <div className=' mb-3 form-check'>
                    <input className='form-check-input' type='radio' name='role' id='visitante' onChange={() => handleRoleChange("visitante")} />
                    <label className='form-check-label' htmlFor='visitante'>
                        Visitante
                    </label>
                </div>

                <div className=' mb-3'>
                    <button type='submit' className='btn btn-success'>
                        Criar
                    </button>
                </div>
            </form>
        </section>
    )
}
