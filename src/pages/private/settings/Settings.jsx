import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState, useEffect} from "react";


export default function Settings() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        cargo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRadioChange = (e) => {
        setFormData({
            ...formData,
            cargo: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Exemplo de como enviar os dados para uma API
        try {
            const response = await updateUser();

            if (!response.ok) {
                throw new Error('Erro ao enviar dados para a API');
            }

            // Tratar a resposta da API conforme necessário
            const result = await response.json();
            console.log('Sucesso:', result);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    async function getAllUsers() {
        try {
            const response = await getUsers();
            setUsers(response);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <section>
            <Container>
                <h1 className={'titulo'}>Minha Conta</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite seu nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Digite seu email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTelefone">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite seu telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                        />
                    </Form.Group>

                <div className="mb-3 form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="organizador" checked/>
                    <label className="form-check-label" htmlFor="organizador">
                        Organizador
                    </label>
                </div>


                    <Form.Group className="mb-3" controlId="formRadio">
                        {['radio'].map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                                <Form.Check
                                    label="Organizador"
                                    name="cargo"
                                    type={type}
                                    id={`organizador-${type}`}
                                    value="organizador"
                                    checked={formData.cargo === "organizador"}
                                    onChange={handleRadioChange}
                                />
                                <Form.Check
                                    label="Visitante"
                                    name="cargo"
                                    type={type}
                                    id={`visitante-${type}`}
                                    value="visitante"
                                    checked={formData.cargo === "visitante"}
                                    onChange={handleRadioChange}
                                />
                            </div>
                        ))}
                    </Form.Group>

                    <Button variant="primary" type="submit" className='btn btn-sm me-2'>
                        Editar
                    </Button>

                    <Button variant="danger" type="submit" className='btn btn-sm'>
                        Excluir
                    </Button>

                </Form>
            </Container>

        </section>
    )
}