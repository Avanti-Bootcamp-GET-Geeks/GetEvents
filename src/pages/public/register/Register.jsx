import { useEffect, useState } from "react"
import { findAllRoles } from "../../../services/roleService"
import { createUser } from "../../../services/userService"

export default function Register() {
    const [nome, setName] = useState("")
    const [telefone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setPassword] = useState("")
    const [cargo, setRole] = useState("")

    const [cargos, setRoles] = useState([])

    async function getAllRoles() {
        try {
            const data = await findAllRoles()
            setRoles(data)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getAllRoles()
    }, [])

    const defineRole = (role) => {
        try {
            const data = cargos.find((item) => item.nome.toLowerCase() == role.toLowerCase())
            if (data) {
                setRole(data.id)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            nome,
            email,
            telefone,
            senha,
            cargo_id: cargo,
        }
        await createUser(data)
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
                    <input type='email' className='form-control' id='inputEmail' placeholder='Digite email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='inputTelefone' className='form-label'>
                        Telefone
                    </label>
                    <input type='text' className='form-control' id='inputTelefone' placeholder='Digite seu telefone' value={telefone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='inputSenha' className='form-label'>
                        Senha
                    </label>
                    <input type='password' className='form-control' id='inputSenha' placeholder='Digite sua senha' value={senha} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className='mb-3 form-check'>
                    <input className='form-check-input' type='radio' name='role' id='organizador' onChange={() => defineRole("organizador")} />
                    <label className='form-check-label' htmlFor='organizador'>
                        Organizador
                    </label>
                </div>

                <div className=' mb-3 form-check'>
                    <input className='form-check-input' type='radio' name='role' id='visitante' onChange={() => defineRole("visitante")} />
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
