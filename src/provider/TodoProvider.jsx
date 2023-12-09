import React, { createContext, useState, useEffect } from 'react';
import { getAllTodo } from '../utils/HandleApi';

// Creating a context to manage todo state
export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch todos when the component mounts
        setLoading(true); // Set loading to true before fetching todos

        //get request to load todos
        getAllTodo()
            .then((data) => {
                setTodo(data.data.tasks); // Update todo state with fetched todos
                setLoading(false); // Set loading to false after fetching todos
            })
            .catch((error) => {
                console.error('Error fetching todo:', error);
                setLoading(false); // Set loading to false in case of error
            });
    }, []);

    const updateTodo = () => {
        // Function to manually update todo
        setLoading(true); // Set loading to true before fetching todos
        getAllTodo()
            .then((data) => {
                setTodo(data.data.tasks); // Update todo state with fetched todos
                setLoading(false); // Set loading to false after fetching todos
            })
            .catch((error) => {
                console.error('Error fetching todo:', error);
                setLoading(false); // Set loading to false in case of error
            });
    };

    return (
        <TodoContext.Provider value={{ todo, loading, updateTodo }}>
            {children}
        </TodoContext.Provider>
    );
};



export { TodoProvider };
