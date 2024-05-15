import {useEffect, useState} from "react";
import {getCategories, deleteCategoryById, updateCategory, createCategory} from "../../../services/categoryService.jsx";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {PencilSquare, Trash} from "react-bootstrap-icons";
import '../../../Global.css';
import {Col, Container} from "react-bootstrap";

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function CategoriesList() {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [category, setCategory] = useState(""); // Estado para armazenar a categoria sendo editada
    const [categoryId, setCategoryId] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showMessageDelete, setShowMessageDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null); // Estado para armazenar o ID da categoria a ser excluída

    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => {
        setShowCreate(true);
        setCategory(""); // Limpar o valor do input
        setCategoryId(null); // Limpar o ID da categoria
    }

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = (category) => {
        setShowEdit(true);
        setCategory(category.nome);
        setCategoryId(category.id); // Definir o ID da categoria
    }

    const handleCloseMessage = () => setShowMessage(false);
    const handleShowMessage = () => setShowMessage(true);

    const handleCloseMessageDelete = () => setShowMessageDelete(false);
    const handleShowMessageDelete = (id) => {
        setIdToDelete(id); // Define o ID da categoria a ser excluída
        setShowMessageDelete(true); // Abre o modal de confirmação
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    useEffect(() => {
        const filtered = categories.filter(category =>
            removeAccents(category.nome.toLowerCase()).includes(removeAccents(search.toLowerCase()))
        );
        setFilteredCategories(filtered);
    }, [categories, search]);

    async function getAllCategories() {
        try {
            const response = await getCategories();
            setCategories(response);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleCreateCategory(newName) {
        try {
            await createCategory({nome: newName});
            // Criar categoria
            await getAllCategories();
            handleCloseCreate();
        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleUpdateCategory(id, newName) {
        try {
            await updateCategory(id, {nome: newName});
            // Atualizar a lista de categorias após a edição
            await getAllCategories();
            handleCloseEdit();
        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleDeleteCategory(id) {
        try {
            handleCloseMessageDelete(); // Fecha o modal de confirmação
            await deleteCategoryById(id);
            const updatedCategories = categories.filter(category => category.id !== id);
            setCategories(updatedCategories);
        } catch (error) {
            handleShowMessage(); // Abre o modal de mensagem de erro
            console.log("Esta categoria está associada a eventos e não pode ser excluída.")
            console.log(error.message);
        }
    }

    return (
        <Container>
            <h1 className={'titulo'}>Lista de Categorias</h1>

            <Form.Control
                type="text"
                className="mb-3"
                aria-describedby="search"
                placeholder="Pesquisar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Button
                className="btn btn-success mb-3"
                onClick={() => handleShowCreate()}
            > Criar </Button>


            {/*Listagem de categorias*/}
            <ListGroup>
                {filteredCategories.map(category => (
                    <ListGroup.Item key={category.id}
                                    className="d-flex align-items-center ">
                        <Col>
                            <p className="mb-0">{category.nome}</p>
                        </Col>

                        <Button className="me-2 bi-pencil-fill"
                                onClick={() => handleShowEdit(category)}> <PencilSquare/>
                        </Button>

                        <Button className="btn btn-danger"
                                onClick={() => handleShowMessageDelete(category.id)}> <Trash/>
                        </Button>

                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/*Modal Criar categoria*/}
            <Modal show={showCreate} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Criar Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        id="categoria"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        aria-describedby="categoria"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreate}> Fechar </Button>
                    <Button variant="success" onClick={() => handleCreateCategory(category)}>
                        Criar
                    </Button>
                </Modal.Footer>
            </Modal>


            {/*Modal editar categoria*/}
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        id="categoria"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        aria-describedby="categoria"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}> Fechar </Button>
                    <Button variant="primary"
                            onClick={() => handleUpdateCategory(categoryId, category)}>Salvar</Button>
                </Modal.Footer>
            </Modal>

            {/*Modal de erro ao excluir categoria*/}
            <Modal show={showMessage} onHide={handleCloseMessage}>
                <Modal.Header closeButton>
                    <Modal.Title>Mensagem</Modal.Title>
                </Modal.Header>
                <Modal.Body>Esta categoria está associada a eventos e não pode ser excluída.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseMessage}> OK </Button>
                </Modal.Footer>
            </Modal>

            {/*Modal de confirmação de exclusão*/}
            <Modal show={showMessageDelete} onHide={handleCloseMessageDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir essa categoria? </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => handleDeleteCategory(idToDelete)}> Sim </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
}
