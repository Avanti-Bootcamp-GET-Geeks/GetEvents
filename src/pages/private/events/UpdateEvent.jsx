import { useEffect, useState } from "react";
import { findEventById, updateEvent } from "../../../services/eventService";
import { findAllLocals } from "../../../services/localService";
import { getCategories } from "../../../services/categoryService";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftSquare, CalendarEvent, FileImage, FileText, PinMap, Tag, TextareaT } from "react-bootstrap-icons";
import './events.css';

export const UpdateEvent = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const navigate = useNavigate();
    const {id} = useParams();
    const [locals, setLocals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [event, setEvent] = useState({});

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
        getEventById();
        getAllLocals();
        getAllCategories();
    }, [])


    const getEventById = async () => {
        try {
            const response = await findEventById(id);
            if (response) {
                setEvent(response);
                setFieldValue({
                    imagem: response.imagem,
                    nome: response.nome,
                    descricao: response.descricao,
                    data_inicio: response.data_inicio ? new Date(response.data_inicio).toISOString().slice(0, 16) : '',
                    data_fim: response.data_fim ? new Date(response.data_fim).toISOString().slice(0, 16) : '',
                    usuario_id: response.usuario_id,
                    categoria_id: response.categoria.id,
                    local_id: response.local.id,
                });
            }
        } catch (error) {
            console.log(error.message)
        }
    }

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
        await updateEvent(event.id, formattedData);
        navigate('/events')
    }

    return(
        <>
        <h1>
            Atualizar evento
            <span title="Clique para voltar" onClick={() => navigate('/events')}><ArrowLeftSquare /></span>
            </h1>
        
        <form onSubmit={handleSubmit}>

                {fieldValue.imagem !== '' &&
                (<figure className="mb-3 text-center">
                     <img src={fieldValue.imagem} alt={event.nome} className="img-fluid" width={450} />
                    <figcaption>Prévia da imagem</figcaption>
                </figure>
                )}
                
                <div className="mb-3">
                     <label htmlFor="imagem" className="form-label"><FileImage /> Imagem</label>
                     <input type="text" className="form-control" name="imagem" value={fieldValue.imagem} id="imagem" onChange={handleChange} />
                 </div>
                <div className="mb-3">
                     <label htmlFor="nome" className="form-label"><TextareaT /> Nome do evento</label>
                     
                     <input type="text" className="form-control" name="nome" value={fieldValue.nome} id="nome" onChange={handleChange} />
                 </div>
                <div className="mb-3">
                     <label htmlFor="descricao" className="form-label"><FileText /> Descrição</label>
                     <textarea name="descricao" className="form-control" id="descricao" value={fieldValue.descricao} onChange={handleChange}></textarea>
                     
                 </div>
                <div className="mb-3">
                     <label htmlFor="dataInicio" className="form-label"><CalendarEvent /> Data de início</label>
                     <input type="datetime-local" className="form-control" name="data_inicio" value={fieldValue.data_inicio} id="dataInicio" onChange={handleChange} />
                 </div>
                <div className="mb-3">
                     <label htmlFor="dataFim" className="form-label"><CalendarEvent /> Último dia</label>
                     <input type="datetime-local" className="form-control" name="data_fim" value={fieldValue.data_fim} id="dataFim" onChange={handleChange} />
                 </div>

                 <div className="mb-3">
                     <input type="text" className="form-control" name="usuario_id" value={fieldValue.usuario_id}  onChange={handleChange} hidden />
                 </div>

                 <div className="mb-3">
                     <label htmlFor="categoria" className="form-label"><Tag /> Categoria</label> <br/>
                     <select name="categoria_id" id="categoria" value={fieldValue.categoria_id} onChange={handleChange} className="form-select" aria-label="Default select example">
                        <option value="" disabled>Selecione uma das opções abaixo</option>
                        {categories.map(category => (
                            <option value={category.id} key={category.id}>{category.nome}</option>
                        ))}
                     </select>
                 </div>

                 <div className="mb-3">                    
                     <label htmlFor="local" className="form-label"><PinMap /> Local</label> <br/>
                     <select name="local_id" id="local" value={fieldValue.local_id} onChange={handleChange}
                     className="form-select" aria-label="Default select example">
                        <option value="" disabled>Selecione uma das opções abaixo</option>

                        {locals.map(local => (
                           <option value={local.id} key={local.id}>{local.nome}</option>
                        ))}
                     </select>
                 </div>

               <button type="submit" className="btn btn-primary">Atualizar</button>
            </form>
        </>
    );
}