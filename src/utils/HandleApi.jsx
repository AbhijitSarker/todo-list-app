import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1'; // Replace with your API base URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllTodo = () => {
    return api.get('/tasks');
};

export const addTodo = (name) => {
    return api.post('/tasks', { name });
};

// Add more API functions as needed, such as updateTodo, deleteTodo, etc.

export default api;
