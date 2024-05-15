import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";

export const Login = () => {
    
    const { loginUser } = useContext(AuthContext);
    const {state} = useLocation();

    // Utilizado para pegar o input password
    const divMessage = useRef(null);

    const [fieldValue, setFieldValue] = useState({
        email: "",
        senha: ""
    });

        // A cada mudança nos inputs, captura o texto digitado
    const handleChange = (event) => {
        setFieldValue({
            ...fieldValue, // valor do state é espalhado neste objeto
            [event.target.name]: event.target.value // atualiza as informações dinamicamente
        });
    };

  
    // Altera o type do input password, permitindo a visualização/ocultação da senha
    const handleMessageClose = () => {
        const divContent = divMessage.current;
        const message = divContent.innerHTML;

        setTimeout(()=> {
            divContent.style.display = 'none';
        }, 2000)

        console.log(message)
    };

        // Sempre que for fazer uma requisição, utilizar função assíncrona (async)
        const handleSubmit = async (event) => {
            event.preventDefault();
    
            // Chama a função de login (do context) e passa os valores do form
             await loginUser(fieldValue);              
            
        }


    return(
        <div className="container m-5">

        <div className="message"ref={divMessage}>{state.message} {state.status}  
        <button onClick={handleMessageClose}>x</button>
        </div>

            <form onSubmit={handleSubmit}>
                <input type="text" name="email" id="" value={fieldValue.email} placeholder="email" onChange={handleChange} /> <br/>
                <input type="password" name="senha" id="" value={fieldValue.senha} placeholder="senha"    onChange={handleChange}/> <br/>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}