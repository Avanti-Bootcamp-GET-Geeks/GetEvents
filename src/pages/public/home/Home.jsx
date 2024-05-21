import { useContext} from "react";
import { Card } from "../../../components/card/Card";
import { EventList } from "../../../components/eventList/EventList";
import { Pagination } from "../../../components/pagination/Pagination";
import { SearchContext } from "../../../context/SearchContext";

export default function Home() {
    const {events, eventsFound, currentPage, handlePageChange} = useContext(SearchContext);
    
    return(
        <div className="container">
            {/* Lista eventos */}
            <EventList>              
                {eventsFound.length > 0
                    ? eventsFound.map(event => (<Card event={event} key={event.id} />))
                    : events.length > 0
                        ? events.map(event => (<Card event={event} key={event.id} />))
                        : <p style={{ color: '#757679' }}>Nenhum evento encontrado.</p>
                }
            </EventList>

            {/* Botões para paginação */}
            <Pagination currentPage={currentPage} handlePageChange={handlePageChange} totalLimit={10} events={events} />
        </div>
    )
}