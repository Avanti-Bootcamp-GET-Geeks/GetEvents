import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import './Global.css'
import './App.css'
import { AuthProvider } from './context/AuthContext.jsx';
import PublicRoutes from './routes/PublicRoutes.jsx';
import PrivateRoutes from './routes/PrivateRoutes.jsx';


export default function App() {
    return(
        <AuthProvider>
            <Header />
                <main>
                    <PublicRoutes />
                    <PrivateRoutes />
                </main>
            <Footer/>
        </AuthProvider>
    );
}
