import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import './App.css'
import { AuthProvider } from './context/AuthContext.jsx';
import PublicRoutes from './routes/PublicRoutes.jsx';
import PrivateRoutes from './routes/PrivateRoutes.jsx';
import { SearchProvider } from "./context/SearchContext.jsx";

export default function App() {
    return (
        <AuthProvider>
            <SearchProvider>
                <Header />
                    <main>
                        <PublicRoutes />
                        <PrivateRoutes />
                    </main>
                <Footer/>
            </SearchProvider>
        </AuthProvider>
    );
}