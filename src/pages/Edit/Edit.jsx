import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from "../../utils/HandleApi";
import Swal from 'sweetalert2'
import useTodo from "../../hooks/useTodo";

const Edit = () => {
    const { id } = useParams(); // Getting the 'id' parameter from the URL

    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');

    const { updateTodo } = useTodo(); // Using custom hook to get todo data and loading status
    const navigate = useNavigate() // Getting the navigate function from react-router-dom

    // Handling changes in the task name input
    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    // Handling changes in the description input
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    useEffect(() => {
        // Fetch the data related to the ID
        api.get(`/tasks/${id}`)
            .then(response => {
                setTask(response.data.task.name); // Update the task state with fetched task name
            })
            .catch(error => {
                console.error('Error fetching todo:', error);
            });
    }, [id]); // Fetch data when 'id' changes

    // Handling form submission to update the task

    const handleSubmit = (e) => {
        e.preventDefault();

        //api request to update todo
        api.patch(`/tasks/${id}`, { name: task })
            .then(response => {
                // Show success message using SweetAlert
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                updateTodo(); // Update todos after task is updated
                navigate('/'); // Navigate back to the main page
            })
            .catch(error => {
                console.error('Error updating todo:', error);
            });
    }
    return (
        <div className="container mx-auto font-serif">
            <h1 className="text-6xl font-bold text-center my-5">Edit Task</h1>

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
                            Update Task
                        </button>
                        <Link to={'/'}><button className="float-right border rounded-md px-3 py-2 text-white bg-red-600">Go Back</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;