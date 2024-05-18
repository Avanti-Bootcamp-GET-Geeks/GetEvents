import { Routes, Route } from 'react-router-dom';
import Settings from '../pages/private/settings/Settings';
import Categories from '../pages/private/categories/Categories';
import { EventListByUser } from '../pages/private/events/EventList';
import Roles from '../pages/private/roles/Roles';
import { CreateEvent } from '../pages/private/events/CreateEvent';
import { UpdateEvent } from '../pages/private/events/UpdateEvent';
import { ProtectedRoute } from './ProtectedRoute';

const PrivateRoutes = () => (
    <Routes>
        {/* Rotas para categorias */}
        <Route path='/categories' element={<ProtectedRoute> <Categories /> </ProtectedRoute>} />

        {/* Rotas para cargos */}
        <Route path='/roles' element={<ProtectedRoute> <Roles /> </ProtectedRoute>} />
        
        {/* Rotas para eventos */}
        <Route path='/my-events' element={<ProtectedRoute> <EventListByUser /> </ProtectedRoute>} />
        <Route path='/create/event' element={<ProtectedRoute> <CreateEvent /> </ProtectedRoute>} />
        <Route path='/update/event/:id' element={<ProtectedRoute> <UpdateEvent /> </ProtectedRoute>} />

        {/* Rotas para usuário */}
        <Route path='/settings' element={<ProtectedRoute> <Settings /> </ProtectedRoute>} />
    </Routes>
);

export default PrivateRoutes;
