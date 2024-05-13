import { useState} from "react"
import { useNavigate, useParams } from "react-router-dom";
import './Header.css'
import logo from '../../assets/img/logo.svg'

export default function Header() {

    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const handle = async (event) => {
       event.preventDefault();
       navigate("")
    }

    return (
        <header>
            <div className="logo"><img alt={'Logo Get Eventos'} src={logo}/></div>
            <form onSubmit={handle}>
                <input className="form-control search-input" type="text" placeholder={"Pesquisar eventos"} value={search} onChange={e => setSearch(e.target.value)}/>
                <button className="search-button" type="submit">Procurar</button>
            </form>

            <nav>
                <ul>
                    <li><a href={""}>CRIE SEU EVENTO</a></li>
                    <li><a href={""}>ACESSE SUA CONTA</a></li>
                    <li><button className="btn btn-primary">Cadastre-se</button></li>
                </ul>
            </nav>
        </header>
    )
}