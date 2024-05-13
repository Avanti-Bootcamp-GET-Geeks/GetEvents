import styles from './card.module.css'
import { Calendar2Event, ChevronRight, PinMap } from 'react-bootstrap-icons';

/* Event recebe TODOS os atributos que são passados para a lista por meio da propriedade event */
export const Card = ({event}) => {

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
        <div className={styles.card} onClick={() => alert(`Clicou no card: ${event.nome}`)}>
            <img src={event.imagem} className="card-img-top" alt={event.nome} />           
            <div className={styles.cardHeader}>
            
            <Calendar2Event /> 
            {differentDates ? 
                formattedDate2.format(new Date(event.data_inicio)) : formattedDate1.format(new Date(event.data_inicio)) 
            }
            { differentDates ? (<ChevronRight />) : ("") }
            { differentDates && formattedDate2.format(new Date(event.data_fim)) } 
                                     
            </div>
            <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}> {event.nome} </h5>
                <p className={styles.cardText}>
                { <PinMap />} {event.local.nome} - {event.local.cidade}, {event.local.estado}
                </p>
            </div>
        </div>
    )
};