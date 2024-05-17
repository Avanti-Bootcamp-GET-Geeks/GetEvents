import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/home/Home';
import {EventInfo} from '../pages/public/eventInfo/EventInfo';
import Register from '../pages/public/register/Register';
import Login from '../pages/public/login/Login';

const PublicRoutes = () => (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/event-info/:id' element={<EventInfo />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
    </Routes>
);

export default PublicRoutes;
