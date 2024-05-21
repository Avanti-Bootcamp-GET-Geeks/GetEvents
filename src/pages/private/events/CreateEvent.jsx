import { useEffect, useState } from "react";
import { createEvent } from "../../../services/eventService";
import { findAllLocals } from "../../../services/localService";
import { getCategories } from "../../../services/categoryService";
import { useNavigate } from "react-router-dom";
import { ArrowLeftSquare, CalendarEvent, FileImage, FileText, PinMap, Tag, TextareaT } from "react-bootstrap-icons";
import './events.css';

export const CreateEvent = () => {
    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const navigate = useNavigate();
    const [locals, setLocals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [fieldValue, setFieldValue] = useState({
        imagem: "",
        nome: "",
        descricao: "",
        data_inicio: "",
        data_fim: "",
        usuario_id: userInfo.id,
        categoria_id: "",
        local_id: "",
    });

    useEffect(()=> {
        getAllLocals();
        getAllCategories();
    }, [])

    const getAllLocals = async() => {
        try {
            const response = await findAllLocals();
            setLocals(response || []);
        } catch (error) {
            console.log(error.message)
        }
    }

    const getAllCategories = async() => {
        try {
            const response = await getCategories();
            setCategories(response || []);
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleChange = (event) => {
            setFieldValue({
            ...fieldValue, 
            [event.target.name]: event.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...fieldValue,
            // Modificando as datas para o formato ISO 8601
            data_inicio: fieldValue.data_inicio ? new Date(fieldValue.data_inicio).toISOString() : '',
            data_fim: fieldValue.data_fim ? new Date(fieldValue.data_fim).toISOString() : ''
        }
        await createEvent(formattedData);
        navigate('/app/my-events')
    }

    return(
        <>
        <h1>Cadastrar evento
        <span title="Clique para voltar" onClick={() => navigate('/app/my-events')}><ArrowLeftSquare /></span>
        </h1>
        
        <form onSubmit={handleSubmit} method="POST">
                {fieldValue.imagem !== '' &&
                    (<figure className="mb-3 text-center">
                        <img src={fieldValue.imagem} alt={fieldValue.nome} className="img-fluid" width={450} />
                        <figcaption>Prévia da imagem</figcaption>
                    </figure>
                )}

                <div className="row mt-5 mb-3">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="imagem" className="form-label"><FileImage /> Imagem</label>
                        <input type="text" className="form-control" name="imagem" value={fieldValue.imagem} id="imagem" onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nome" className="form-label"><TextareaT /> Nome</label>
                        <input type="text" className="form-control" name="nome" value={fieldValue.nome} id="nome" onChange={handleChange} />
                    </div>
                </div>

                  <div className="row mb-4">
                        <div className="col-12">
                            <label htmlFor="descricao" className="form-label"><FileText /> Descrição</label>
                            <textarea name="descricao" className="form-control" id="descricao" value={fieldValue.descricao} rows={5} onChange={handleChange}></textarea>
                        </div>
                </div>

                <div className="row mt-4 mb-3">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="dataInicio" className="form-label"><CalendarEvent /> Data de início</label>
                        <input type="datetime-local" className="form-control" name="data_inicio" value={fieldValue.data_inicio} id="dataInicio" onChange={handleChange} />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="dataFim" className="form-label"><CalendarEvent /> Último dia de evento</label>
                        <input type="datetime-local" className="form-control" name="data_fim" value={fieldValue.data_fim} id="dataFim" onChange={handleChange} />
                   </div>


                   <div hidden>
                     <input type="text" className="form-control" name="usuario_id" value={fieldValue.usuario_id}  onChange={handleChange} hidden />
                 </div>

                 <div className="col-md-3 mb-3">
                     <label htmlFor="categoria" className="form-label"><Tag /> Categoria</label> <br/>
                     <select name="categoria_id" id="categoria" value={fieldValue.categoria_id} onChange={handleChange} className="form-select" aria-label="Default select example">
                        <option value="" disabled>Selecione uma das opções abaixo</option>
                        {categories.map(category => (
                            <option value={category.id} key={category.id}>{category.nome}</option>
                        ))}
                     </select>
                 </div>

                 <div className="col-md-3 mb-3">                    
                     <label htmlFor="local" className="form-label"><PinMap /> Local</label> <br/>
                     <select name="local_id" id="local" value={fieldValue.local_id} onChange={handleChange}
                     className="form-select" aria-label="Default select example">
                        <option value="" disabled>Selecione uma das opções abaixo</option>

                        {locals.map(local => (
                           <option value={local.id} key={local.id}>{local.nome}</option>
                        ))}
                     </select>
                 </div>

                </div>  

               <button type="submit" className="btn btn-primary mt-2">Cadastrar</button>
            </form>
        </>
    );
}