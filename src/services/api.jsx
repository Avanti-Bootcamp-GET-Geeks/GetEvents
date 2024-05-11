import axios from 'axios';
require('dotenv').config();

const api = axios.create({
    baseURL: process.env.BASE_URL_API
});

export default api;