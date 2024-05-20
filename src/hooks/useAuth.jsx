import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import api from '../services/api';

const useAuth = () => {
    const [userLogged, setUserLogged] = useState(false); // Estado que vai indicar se o usuário está ou não logado
    const [loading, setloading] = useState(true); // Utilizado para evitar o userLogged como false quando o usuário estiver logado
    const [isAdmin, setIsAdmin] = useState(false); // utilizado para acesso de páginas restritas à admin
    
    // Realiza navegação entre páginas
    const navigate = useNavigate();
    
    useEffect(() => {
        // Busca usuário no localStorage e converte para objeto JS
        const userInfo = JSON.parse(localStorage.getItem('userInfo')); 
        
        // Verifica se existe...
        if (userInfo) {
            // Add header em todas as chamadas da aplicação quando estiver logado
            api.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
            
            setUserLogged(true); // Utilizado caso já esteja logado
        }
        
        setloading(false);
    }, [isAdmin]);
    

     // Função para ser utilizada na página de login
    const loginUser = async (inputValues) => {
        try {
            const response = await login(inputValues);

            if (response) {
                // Salva dados do usuário logado no localStorage
                localStorage.setItem('userInfo', JSON.stringify(response));

                // Add header em todas as chamadas da aplicação - ao logar
                api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

                setUserLogged(true); // Altera status do usuário -> Logado
                setIsAdmin(response.isAdmin); // Seta true/false com base no user logado
                navigate('/'); // Redireciona para home - listagem de eventos
            }

        } catch (error) {
            const message = error.response.data.message;
            const status = error.response.status;
            // console.log(status);
            alert(error.response.data.message);
            navigate('/login', {state: {message, status}}); // Chama a rota de login com a message  de erro
        }
    };


    const logoutUser = () => {
        setUserLogged(false); // Estado passa a ser falso (Não logado)
        // Limpa o localStorage
        localStorage.removeItem('userInfo'); 
        setIsAdmin(false);
        navigate('/login'); // Redireciona para pág login
    };

    // Retorna um objeto com todas as variáveis de estado e funções
    return { userLogged, loading, loginUser, logoutUser, isAdmin };
}

export default useAuth;