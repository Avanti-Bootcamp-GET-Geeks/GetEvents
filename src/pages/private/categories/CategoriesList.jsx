import {useEffect, useState} from "react";
import {getCategories, getCategoryById, deleteCategoryById} from "../../../services/categoryService.jsx";

import '../../../Global.css';

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function CategoriesList() {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);


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

    async function handleDeleteCategory(id) {
        try {
            await deleteCategoryById(id);
            const updatedCategories = categories.filter(category => category.id !== id);
            setCategories(updatedCategories);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleGetCategory(id) {
        try {
            const category = await getCategoryById(id);
            console.log(category);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container mb-3">
            <h1 className={'titulo'}>Lista de Categorias</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <button className="btn btn-success btn-sm mb-3">
                Criar
            </button>
            <ul className="list-group">
                {filteredCategories.map(category => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={category.id}>
                        <div>
                            <p className="mb-0">Categoria: {category.nome}</p>
                        </div>
                        <div>
                            <button className="btn btn-primary btn-m me-2"
                                    onClick={() => handleGetCategory(category.id)}> Editar
                            </button>
                            <button className="btn btn-danger"
                                    onClick={() => handleDeleteCategory(category.id)}> Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
