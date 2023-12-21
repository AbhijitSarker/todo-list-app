import axios from 'axios';

// Base URL for your API
const API_BASE_URL = 'https://task-manager-ten-tau.vercel.app/api/v1';

// Create an axios instance with common configurations
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to fetch all todos
export const getAllTodo = () => {
    return api.get('/tasks');
};

// Function to add a todo
export const addTodo = (data) => {
    return api.post('/tasks', data);
};


export default api;
