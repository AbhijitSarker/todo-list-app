import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllTodo } from '../utils/HandleApi';

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch todos when the component mounts
        setLoading(true);
        getAllTodo()
            .then((data) => {
                setTodo(data.data.tasks);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching todo:', error);
                setLoading(false);
            });
    }, []);

    const updateTodo = () => {
        // Function to manually update todo
        setLoading(true);
        getAllTodo()
            .then((data) => {
                setTodo(data.data.tasks);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching todo:', error);
                setLoading(false);
            });
    };

    return (
        <TodoContext.Provider value={{ todo, loading, updateTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
};

export { TodoProvider, useTodo };
