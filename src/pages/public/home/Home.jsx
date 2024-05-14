import { useEffect, useState } from "react";
import { Card } from "../../../components/card/Card";
import { EventList } from "../../../components/eventList/EventList";
import { findAllEvents } from "../../../services/eventService";
import { Pagination } from "../../../components/pagination/Pagination";

export default function Home() {

    const [events, setEvents] = useState([]);
    const [categoria, setCategoria] = useState("");
    const [local, setLocal] = useState("");
    const [data, setData] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=> {
        getAllEvents();
    }, [currentPage])


    const getAllEvents = async () => {
        const limit = 10;
        const offset = (currentPage - 1) * limit;

        try {
            const response = await findAllEvents(categoria, local, data, limit, offset);
            if(response) {
                setEvents(response);
            } else setEvents([]);
        } catch(error) {
            console.log(error.message)
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return(
        <>

            <div className="container">
                {/* Lista eventos */}
                <EventList>
                    { events.length > 0 ?
                        (  events.map(event => (<Card event={event} key={event.id} />)  ) ) :

                        <p style={{color: '#757679'}}>Nenhum evento encontrado.</p>
                    }
                </EventList>

                {/* Botões para paginação */}
                <Pagination currentPage={currentPage} handlePageChange={handlePageChange} events={events} />
            </div>
        </>
    )
}