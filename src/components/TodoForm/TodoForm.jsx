import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { addTodo } from '../../utils/HandleApi';
import Swal from 'sweetalert2'
import useTodo from '../../hooks/useTodo';

const TodoForm = () => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');

    const { updateTodo } = useTodo(); // Using the useTodo hook from  TodoProvider

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Making a POST request to add a new task
        addTodo(task)
            .then(response => {
                updateTodo(); // Refreshing todos after adding a new task
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Task has been Added",
                    showConfirmButton: false,
                    timer: 1500
                });
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
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  >  Add Task </button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;
