import api from './api'

const createEvent = async (event) => {
    try {
        const response = await api.post('/event', event);
        return response.data;
    } catch (error) {
        console.error(error.message)
        throw error;
    }
}

const findAllEvents = async (categoria, local, data, limit, offset) => {
    try {
        const response = await api.get(`/events?categoria_id=${categoria}&local_id=${local}&data=${data}&limit=${limit}&offset=${offset}`);
        return response.data; 
    } catch(error) {
        console.error(error.message);
        throw error; 
    }
}

const findAllEventsByUserId = async (id, limit, offset) => {
    try {
        const response = await api.get(`/events/user/${id}?limit=${limit}&offset=${offset}`);
        return response.data;
    } catch (error) {
        console.error(error.message)
        throw error;
    }
}


const findEventById = async (id) => {
    try {
        const response = await api.get(`/event/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.message)
        throw error;
    } 
}


const updateEvent = async (id, event) => {
    try {
        const response = await api.put(`/event/${id}`, event);
        return response.data;
    } catch (error) {
        console.error(error.message)
        throw error;
    }
}

const deleteEvent = async (id) => {
    try {
        const response = await api.delete(`/event/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.message)
        throw error;
    }
}

export { createEvent, findAllEvents, findAllEventsByUserId, findEventById, updateEvent, deleteEvent }