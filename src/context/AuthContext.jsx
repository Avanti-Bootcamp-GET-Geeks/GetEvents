import { createContext } from 'react';
import useAuth from '../hooks/useAuth'; // Hook criado para autenticação

// Permite inicializar o contexto do componente AuthProvider
export const AuthContext = createContext();

// Responsável em fornecer/Prover os dados
export const AuthProvider = ({ children }) => {

    // Importa o hooks com suas funcionalidades de forma desestruturada
    const { userLogged, loading, loginUser, logoutUser  } = useAuth();

    // Enquanto estiver carregando, renderiza o h1, ao finalizar carrega os componentes children
    if (loading) {
        return(
            <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>    
            </div>
        );
    }

    return (
        // Indica o que será provido por meio da propriedade value
        <AuthContext.Provider value={{ userLogged, loading, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}