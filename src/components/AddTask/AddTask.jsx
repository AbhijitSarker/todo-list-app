import React, { useState } from 'react';
import { addTodo } from '../../utils/HandleApi';
import Swal from 'sweetalert2'
import useTodo from '../../hooks/useTodo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddTask = () => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);

    const { updateTodo } = useTodo(); // Using the useTodo hook from  TodoProvider
    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleDateChange = (date) => {
        setDueDate(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Making a POST request to add a new task
        addTodo({ name: task, description: description, dueDate: dueDate })
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
                    <div className="w-full max-w-xs">
                        <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">
                            Due Date:
                        </label>
                        <div className="relative">
                            <DatePicker
                                id="dueDate"
                                selected={dueDate}
                                onChange={handleDateChange}
                                className="w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                dateFormat="dd MMM yyyy" // Customize date format if needed
                                minDate={new Date()} // Optionally set a minimum date
                            />

                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  >  Add Task </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;
