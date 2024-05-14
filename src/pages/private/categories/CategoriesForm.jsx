import {useEffect, useState} from "react"
import {createCategory, getCategoryById, updateCategory} from "../../../services/categoryService.jsx";
import {useNavigate, useParams} from "react-router-dom";


export default function CategoriesForm() {
    const [name, setName] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function setForm() {
            try {
                if (id) {
                    const client = await getCategoryById(id);
                    setName(client.name);
                }
            } catch (error) {
                console.log("Error")
            }
        }

        setForm();
    }, [id]);

    const handle = async (event) => {
        event.preventDefault();
        const data = {name};
        if (id) {
            await updateCategory(id, data);
        } else {
            await createCategory(data);
        }
        navigate("/");
    }

    return (
        <section>
            <h1 className={'titulo'}>Categorias</h1>
            <form onSubmit={handle}>
                <div className="mb-3">
                    <label htmlFor="inputCategoria" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="inputCategoria" placeholder='Digite a categoria'
                           value={name} onChange={e => setName(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-primary">{id ? 'Atualizar' : 'Criar'}</button>

            </form>
        </section>
    )
}
