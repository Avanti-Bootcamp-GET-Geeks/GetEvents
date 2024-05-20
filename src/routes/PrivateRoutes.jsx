import { Routes, Route } from 'react-router-dom';
import Settings from '../pages/private/settings/Settings';
import Categories from '../pages/private/categories/Categories';
import Locations from '../pages/private/locations/Locations';
import Roles from '../pages/private/roles/Roles';
import { EventList } from '../pages/private/events/EventList';
import { CreateEvent } from '../pages/private/events/CreateEvent';
import { UpdateEvent } from '../pages/private/events/UpdateEvent';
import { ProtectedRoute } from './ProtectedRoute';

const PrivateRoutes = () => (
    <Routes>
        {/* Rotas para categorias */}
        <Route path='/categories' element={<ProtectedRoute> <Categories /> </ProtectedRoute>} />

        {/* Rotas para locais */}
        <Route path='/locations' element={<ProtectedRoute> <Locations /> </ProtectedRoute>} />

        {/* Rotas para cargos */}
        <Route path='/roles' element={<ProtectedRoute> <Roles /> </ProtectedRoute>} />
        
        {/* Rotas para eventos */}
        <Route path='/events' element={<ProtectedRoute> <EventList /> </ProtectedRoute>} />
        <Route path='/create/event' element={<ProtectedRoute> <CreateEvent /> </ProtectedRoute>} />
        <Route path='/update/event/:id' element={<ProtectedRoute> <UpdateEvent /> </ProtectedRoute>} />

        {/* Rotas para usuário */}
        <Route path='/settings' element={<ProtectedRoute> <Settings /> </ProtectedRoute>} />
    </Routes>
);

export default PrivateRoutes;
