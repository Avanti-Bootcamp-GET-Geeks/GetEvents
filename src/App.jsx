import {Routes, Route} from 'react-router-dom'
import Home from './pages/public/home/Home'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import './Global.css'
import Register from "./pages/public/register/Register.jsx";


function App() {
    return (
        <>
            <Header/> {/* Renderiza o Header em todas as páginas */}
            <main>
                <Routes>
                    <Route path='/' element={<Home/>}/> {/* Renderiza a Home diretamente */}
                    <Route path='/register' element={<Register/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    );
}

export default App
