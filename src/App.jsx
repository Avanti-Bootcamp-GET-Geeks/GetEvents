import {Routes, Route} from 'react-router-dom'
import Home from './pages/public/home/Home'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import './Global.css'
import './App.css'
import { EventInfo } from './pages/public/eventInfo/EventInfo'
import Register from "./pages/public/register/Register.jsx";
import Settings from "./pages/private/settings/Settings.jsx";
import Login from "./pages/public/login/Login.jsx";
import CategoriesForm from "./pages/private/categories/CategoriesForm.jsx";
import CategoriesList from "./pages/private/categories/CategoriesList.jsx";


export default function App() {
    return (
        <>
            <Header/> {/* Renderiza o Header em todas as páginas */}
            <main>
                <Routes>
                    <Route path='/' element={<Home/>}/> {/* Renderiza a Home diretamente */}
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/categories-add' element={<CategoriesForm/>}/>
                    <Route path='/categories-list' element={<CategoriesList/>}/>
                    <Route path='/event/:id' element={<EventInfo/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    );
}