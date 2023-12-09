import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { addTodo, getAllTodo } from '../../utils/HandleApi';

const TodoForm = ({ name }) => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');

    const location = useLocation();

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addTodo(task)
            .then(response => {
                // Handle the response after a successful POST request
                console.log('Todo added:', response.data);
                // Clear the form fields after a successful submission
                setTask('');
                setDescription('');
            })
            .catch(error => {
                // Handle error in case the POST request fails
                console.error('Error adding todo:', error);
            });
    }
    return (
        <div className="mt-8 container mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="task" className="block text-gray-700 font-bold mb-2">
                        Task Name
                    </label>
                    <input
                        type="text"
                        id="task"
                        className="border-b-2 border-black rounded-lg py-2 px-3 w-full"
                        value={task}
                        onChange={handleTaskChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="border-b-2 border-black rounded-lg py-2 px-3 w-full"
                        rows="3"
                        value={description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {name}
                    </button>
                    {
                        location.pathname === '/edit' && <Link to={'/'}><button className="float-right border rounded-md px-3 py-2 text-white bg-red-600">Go Back</button></Link>

                    }
                </div>
            </form>
        </div>
    );
};

export default TodoForm;
