import axios from 'axios';

// Base URL for your API
const API_BASE_URL = 'http://localhost:3000/api/v1';

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
export const addTodo = (name) => {
    return api.post('/tasks', { name });
};
// Function to add a todo
export const addTodo = (name) => {
    return api.post('/tasks', { name });
};


export default api;
