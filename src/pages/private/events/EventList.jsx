import { useEffect, useState } from "react";
import { Pagination } from "../../../components/pagination/Pagination";
import { deleteEvent, findAllEventsByUserId } from "../../../services/eventService";
import { useLocation, useNavigate } from "react-router-dom";
import { EventList } from "../../../components/eventList/EventList";
import { CardPrivate } from "../../../components/card/CardPrivate";
import ToastAnimated, {showToast} from "../../../components/ui-lib/Toast";
import './events.css';

export const EventListByUser = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); // pega info do usuário logado no localStorage
  
    const navigate = useNavigate();
    const {state} = useLocation();
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

     useEffect(()=> {   
        getAllEventsByUserId(userInfo.id); // Faz requisição com o id do usuário logado
    }, [currentPage])

    useEffect(()=> {
        state && showToast({ type: 'success', message: state });
    }, [state])
  
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
            showToast({ type: 'success', message: 'Evento excluído com sucesso!' });
            getAllEventsByUserId(userInfo.id);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return(
        <>
            {/* Componente de alerts */}
            <ToastAnimated />

            <div>
                <button className="btn btn-primary mb-5 float-end" onClick={() => navigate('/create/event')}>Cadastrar evento</button>
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