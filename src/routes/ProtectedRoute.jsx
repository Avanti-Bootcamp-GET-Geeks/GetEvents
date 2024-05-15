import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({children}) => {
    const {userLogged} = useContext(AuthContext); 

    // Se logado = false, redireciona para pág login
    if(!userLogged) {
        return <Navigate to='/login' />;
        
    } else {
        // Se logado, retorna o que estiver dentro da ProtectedRoute -> children
        return children;
    }

}