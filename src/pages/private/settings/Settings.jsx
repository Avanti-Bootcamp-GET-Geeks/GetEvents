import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useContext } from "react";
import { findUserById, updateUser, deleteUser } from "../../../services/userService";
import { findAllRoles } from "../../../services/roleService";
import { AuthContext } from "../../../context/AuthContext";

export default function Settings() {
    // Pega a função logoutUser do contexto de autenticação
    const { logoutUser } = useContext(AuthContext);

    // Pega as informações do usuário do localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Define o estado para armazenar as roles e os dados do formulário
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        cargo: ''
    });

    // useEffect para carregar as roles e os dados do usuário quando o componente é montado
    useEffect(() => {
        getRoles();
        loadUserData();
    }, []);

    // Função para pegar todas as roles do servidor
    const getRoles = async () => {
        try {
            const res = await findAllRoles();
            res ? setRoles(res) : setRoles([]);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Função para carregar os dados do usuário pelo ID
    const loadUserData = async () => {
        try {
            const user = await findUserById(userInfo.id);
            setFormData({
                nome: user.nome,
                email: user.email,
                telefone: user.telefone,
                senha: '', // Não carregue a senha real
                cargo_id: user.cargo.id // Assumindo que o cargo é armazenado como cargo_id
            });
        } catch (error) {
            console.error("Erro ao carregar os dados do usuário:", error);
        }
    };

    // Função para lidar com mudanças nos inputs do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Função para lidar com mudanças nos inputs de radio button
    const handleRadioChange = (e) => {
        setFormData({
            ...formData,
            cargo_id: e.target.value
        });
    };

    // Função para lidar com a submissão do formulário de edição
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(userInfo.id, formData);
            alert("Dados atualizados com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar os dados:", error);
        }
    };

    // Função para lidar com a exclusão do usuário
    const handleDelete = async () => {
        if (window.confirm("Tem certeza de que deseja excluir sua conta?")) {
            try {
                await deleteUser(userInfo.id);
                alert("Conta excluída com sucesso!");
                logoutUser(); // Desloga o usuário após a exclusão da conta
            } catch (error) {
                console.error("Erro ao excluir a conta:", error);
            }
        }
    };

    return (
        <section>
            <Container>
                <h1 className="titulo">Minha Conta</h1>
                <Form onSubmit={handleSubmit}>
                    {/* Campo de nome */}
                    <Form.Group className="mb-3" controlId="formNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite seu nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Campo de email */}
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Digite seu email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Campo de telefone */}
                    <Form.Group className="mb-3" controlId="formTelefone">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite seu telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Campo de senha */}
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Digite sua senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Campos de roles */}
                    <Form.Group className="mb-3" controlId="formRadio">
                        {roles.map((role) => (
                            role.nome !== 'admin' && (
                                <Form.Check
                                    key={role.id}
                                    label={role.nome}
                                    name="cargo_id"
                                    type="radio"
                                    id={role.id}
                                    value={role.id}
                                    checked={formData.cargo_id === role.id}
                                    onChange={handleRadioChange}
                                />
                            )
                        ))}
                    </Form.Group>

                    {/* Botões de editar e excluir */}
                    <Button variant="primary" type="submit" className="btn btn-sm me-2">
                        Editar
                    </Button>

                    <Button variant="danger" type="button" className="btn btn-sm" onClick={handleDelete}>
                        Excluir
                    </Button>
                </Form>
            </Container>
        </section>
    );
}
