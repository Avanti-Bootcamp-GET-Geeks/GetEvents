import {Routes, Route} from 'react-router-dom';
import Home from './pages/public/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './Global.css';
import './App.css';
import {EventInfo} from './pages/public/eventInfo/EventInfo'
import Register from './pages/public/register/Register';
import Settings from './pages/private/settings/Settings';
import Login from './pages/public/login/Login';
import Categories from './pages/private/categories/Categories.jsx';
import {SearchProvider} from './contexts/SearchContext.jsx';
import {useState} from "react";

export default function App() {
    // Defina admin e setAdmin usando useState
    const [admin, setAdmin] = useState(false);

    return (
        <SearchProvider>

            <Header admin={admin} setAdmin={setAdmin}/>{/* Renderiza o Header em todas as páginas */}
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/> {/* Renderiza a Home diretamente */}
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/categories" element={<Categories/>}/>
                    <Route path="/event/:id" element={<EventInfo/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Routes>
            </main>
            <Footer/>

        </SearchProvider>
    );
}
