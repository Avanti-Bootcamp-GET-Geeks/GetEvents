import { useNavigate } from 'react-router-dom';
import './Card.css'
import { Calendar2Event, ChevronRight, PinMap, Eye, PencilSquare, Trash3 } from 'react-bootstrap-icons';

/* Event recebe TODOS os atributos que são passados para a lista por meio da propriedade event */
export const CardPrivate = ({event, handleDelete}) => {

    const navigate = useNavigate();

    const formattedDate1 = new Intl.DateTimeFormat('pt-BR', {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "numeric",
        minute: "2-digit"
    });

    const formattedDate2 = new Intl.DateTimeFormat('pt-BR', {
        day: "2-digit",
        month: "short"
    });

    const differentDates = event.data_inicio !== event.data_fim;

    return(
        <div className="card">
            <img src={event.imagem} className="card-img-top" alt={event.nome} />           
            <div className="cardHeader">
            
            <Calendar2Event /> 
            {differentDates ? 
                formattedDate2.format(new Date(event.data_inicio)) : formattedDate1.format(new Date(event.data_inicio)) 
            }
            { differentDates && (<ChevronRight />) }
            { differentDates && formattedDate2.format(new Date(event.data_fim)) } 
                                     
            </div>
            <div className="cardBody">
                <h5 className="cardTitle"> {event.nome} </h5>
                <p className="cardText">
                 <PinMap /> {event.local.nome} - {event.local.cidade}, {event.local.estado}
                </p>
            </div>

            <div className="container-icons">
                <div className="col-3 text-center">
                        <Eye className="icon-eye" onClick={() => navigate(`/event-info/${event.id}`, {state: event})} title='Visualizar na visão do público' />
                    </div>
                    <div className="col-3 text-center">
                        <PencilSquare className="icon-edit" onClick={() => navigate(`/update/event/${event.id}`)} title='Editar' />
                    </div>
                    <div className="col-3 text-center">
                        <Trash3 className="icon-trash" onClick={() => handleDelete(event.id)} title='Excluir' /> 
                    </div>
            </div>
        </div>
    )
};