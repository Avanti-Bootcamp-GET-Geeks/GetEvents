import { useEffect, useState } from "react"
import {deleteCategoryById, getCategories} from "../../../services/categoryService.jsx";
import { useNavigate } from "react-router-dom";
import '../../../Global.css'


export default function CategoriesList() {

    const [categories, setCategories] = useState([]);
    const [categoriesRender, setCategoriesRender] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    async function getAllCategories() {
        try {
            const data = await getCategories();
            setCategories(data);
            setCategoriesRender(data);
        } catch {
            console.error("Error getClients")
        }
    }

    useEffect(() => {
        getAllCategories();
    },[]);

    useEffect(() => {
        const filtered = categories.filter((category) =>
            Object.values(category).some((value) =>
                value.toString().toLowerCase().includes(search.toLowerCase())
            )
        );
        setCategoriesRender(filtered)
    },[categories, search])

    const deleteCategory = async (id) => {
        try {
            await deleteCategoryById(id);
            getAllCategories();
        } catch {
            console.error("Error deleteClient")
        }
    }

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value === "") {
            getCategories();
            setCategoriesRender(categories)
        }
    };

    return (
        <div className="container mb-3">
            <h1 className={'titulo'}>Lista de Categorias</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
            <button
                className="btn btn-success btn-sm mb-3"
                onClick={() => navigate(`/categories-add`)}
            >
                +
            </button>
            <ul className="list-group">
                {categoriesRender.map(category => (
                    <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-0">{category.name}</h4>
                            <p className="mb-0">Categoria: {category.name}</p>
                        </div>
                        <div>
                            <button className="btn btn-primary btn-m me-2" onClick={() => navigate(`/categories/${category.id}`)}> Editar </button>
                            <button className="btn btn-danger" onClick={() => deleteCategory(category.id)}> Excluir </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )

}

