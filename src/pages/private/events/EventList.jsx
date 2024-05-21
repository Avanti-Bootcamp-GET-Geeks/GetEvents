import { useEffect, useState } from "react";
import { Pagination } from "../../../components/pagination/Pagination";
import { deleteEvent, findAllEventsByUserId } from "../../../services/eventService";
import { useNavigate } from "react-router-dom";
import './events.css';
import { EventList } from "../../../components/eventList/EventList";
import { CardPrivate } from "../../../components/card/CardPrivate";

export const EventListByUser = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); // pega info do usuário logado no localStorage
  
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

     useEffect(()=> {   
        getAllEventsByUserId(userInfo.id); // Faz requisição com o id do usuário logado
    }, [currentPage])
  
    const getAllEventsByUserId = async (id) => {
        const limit = 10;
        const offset = (currentPage - 1) * limit;

        try {
            const response = await findAllEventsByUserId(id, limit, offset);
            if(response) 
                setEvents(response);
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

    return(
        <>
            <div>
                <button className="btn btn-primary mb-3 float-end" onClick={() => navigate('/app/create/event')}>Cadastrar evento</button>
            </div>

            <EventList>
                {events.length > 0 ? events.map(event => (<CardPrivate event={event} key={event.id} handleDelete={removeEvent} />))
                    : (<p style={{ color: '#757679' }}>Nenhum evento cadastrado.</p>)
                }
            </EventList>

            {/* Botões para paginação */}
            <Pagination currentPage={currentPage} handlePageChange={handlePageChange} totalLimit={10} events={events} />
        </>
    )
}