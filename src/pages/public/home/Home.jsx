import { Card } from "../../../components/card/Card";
import { EventList } from "../../../components/eventList/EventList";

export default function Home() {
    
    // Eventos (Dados mocados)
    const events = [
        {
            id: "1",
            imagem: "https://www.moblee.com.br/blog/wp-content/uploads/sites/2/2021/11/evento-corporativo-interno.jpg",
            data_inicio: "2024-06-02T18:00:00Z",
            data_fim: "2025-07-03T18:00:00Z",
            nome: "Nome do evento 1",
            local: {
                nome: "Local 1",
                cidade: "Cidade",
                estado: "UF"
            }
        },
        {
            id: "2",
            imagem: "https://ingresso-a.akamaihd.net/img/cinema/cover/cover_theater_1230.jpg",
            data_inicio: "2024-06-02T18:00:00Z",
            data_fim: "2024-06-04T18:00:00Z",
            nome: "Nome do evento 2",
            local: {
                nome: "Local 2",
                cidade: "Cidade",
                estado: "UF"
            } 
        },
        {
            id: "3",
            imagem: "https://img.freepik.com/fotos-gratis/sala-de-espera-com-monitores_1232-1390.jpg",
            data_inicio: "2024-06-02T18:00:00Z",
            data_fim: "2024-06-02T18:00:00Z",
            nome: "Nome do evento 3",
            local: {
                nome: "Local 3",
                cidade: "Cidade",
                estado: "UF"
            }
        },
        {
            id: "4",
            imagem: "https://st2.depositphotos.com/1823785/7196/i/450/depositphotos_71969287-stock-photo-people-hands-holding-colorful-word.jpg",
            data_inicio: "2024-06-02T18:00:00Z",
            data_fim: "2024-06-02T18:00:00Z",
            nome: "Nome do evento 4",
            local: {
                nome: "Local 4",
                cidade: "Cidade",
                estado: "UF"
            }
        },
        {
            id: "5",
            imagem: "https://tpeventos.com.br/wp-content/uploads/2015/07/evento-000-1030x494.jpg",
            data_inicio: "2024-06-02T18:00:00Z",
            data_fim: "2024-06-02T18:00:00Z",
            nome: "Nome do evento 5",
            local: {
                nome: "Local 5",
                cidade: "Cidade",
                estado: "UF"
            }
        },
        {
            id: "6",
            imagem: "https://latam.gamescom.global/wp-content/uploads/2023/12/52334857587-ed50cb1b37-c.jpeg",
            data_inicio: "2024-06-02T18:00:00Z",
            data_fim: "2024-06-02T18:00:00Z",
            nome: "Nome do evento 6",
            local: {
                nome: "Local 6",
                cidade: "Cidade",
                estado: "UF"
            }
        },
        {
            id: "7",
            imagem: "https://images.pexels.com/photos/20079871/pexels-photo-20079871/free-photo-of-rua-via-caminhando-andando.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            data_inicio: "2024-06-02T18:00:00Z",
            data_fim: "2024-07-02T18:00:00Z",
            nome: "Nome do evento 7",
            local: {
                nome: "Local 7",
                cidade: "Cidade",
                estado: "UF"
            }
        },
        {
            id: "8",
            imagem: "https://png.pngtree.com/thumb_back/fh260/back_our/20190619/ourmid/pngtree-spring-sports-event-poster-background-material-image_138484.jpg",
            data_inicio: "2024-06-02T18:00:00Z",
            data_fim: "2024-06-02T18:00:00Z",
            nome: "Nome do evento 8",
            local: {
                nome: "Local 8",
                cidade: "Cidade",
                estado: "UF"
            }
        }
    ];

    return(
        <>
        <h1>Home</h1>

        <div className="container">
            <EventList>
                { events.map(event => (<Card event={event} key={event.id} />)  ) }
            </EventList>           
        </div>
        </>
    )
}