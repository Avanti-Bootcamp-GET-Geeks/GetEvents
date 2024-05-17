import { useEffect, useState } from "react";
import { Pagination } from "../../../components/pagination/Pagination";
import { deleteEvent, findAllEventsByUserId } from "../../../services/eventService";
import { PencilSquare, Trash3 } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import './events.css';

export const EventList = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); // pega info do usuário logado no localStorage
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=> {   
        getAllEventsByUserId(userInfo.id); // Faz requisição com o id do usuário logado
    }, [currentPage])
    
    const getAllEventsByUserId = async (id) => {
        const limit = 5;
        const offset = (currentPage - 1) * limit;

        try {
            const response = await findAllEventsByUserId(id, limit, offset);
            if(response) {
                setEvents(response);
            } else setEvents([]);
        } catch(error) {
            console.log(error.message)
        }
    };

    const removeEvent = async (id) => {
        const answer = window.confirm('Tem certeza que deseja excluir este evento?');
        if (answer) {
            await deleteEvent(id);
            getAllEventsByUserId(userInfo.id);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: "2-digit",
        month: "long",
        hour: "numeric",
        minute: "2-digit"
    });


    return(
        <>
        <div>
        <button className="btn btn-primary mb-3 float-end" onClick={() => navigate('/create/event')}>Cadastrar evento</button>
        </div>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Data/Hora</th>
                    <th colSpan={2}>Ações</th>
                </tr>
            </thead>
            <tbody>
                {events.map(event => (
                    <tr key={event.id}>
                        <td> <img src={event.imagem} alt={event.nome} className="img-fluid" /> </td>
                        <td> {event.nome} </td>
                        <td> {formattedDate.format(new Date(event.data_inicio))} </td>
                        <td> <PencilSquare className="icon-edit" onClick={() => navigate(`/update/event/${event.id}`)} /> </td>
                        <td> <Trash3 className="icon-trash" onClick={() => removeEvent(`${event.id}`)} /> </td>
                    </tr>
                ))}
            </tbody>
        </table>

         {/* Botões para paginação */}
         <Pagination currentPage={currentPage} handlePageChange={handlePageChange} totalLimit={5} events={events} />
        </>
    )
}