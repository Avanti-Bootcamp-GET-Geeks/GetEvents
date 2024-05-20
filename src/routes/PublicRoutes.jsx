import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/public/home/Home';
import { EventInfo } from '../pages/public/eventInfo/EventInfo';
import Register from '../pages/public/register/Register';
import Login from '../pages/public/login/Login';
import NotFound from "../pages/public/notFound/NotFound.jsx";

const PublicRoutes = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/event-info/:id' element={<EventInfo />} />
    <Route path='/register' element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route path='/404' element={<NotFound />} />
    <Route path="/*" element={<Navigate to="/404" />} />
  </Routes>
);

export default PublicRoutes;
