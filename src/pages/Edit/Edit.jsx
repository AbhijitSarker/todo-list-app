import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from "../../utils/HandleApi";
import Swal from 'sweetalert2'
import useTodo from "../../hooks/useTodo";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from "react-helmet-async";


const Edit = () => {
    const { id } = useParams(); // Getting the 'id' parameter from the URL

    const [item, setItem] = useState({});
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [isChecked, setIsChecked] = useState(false); // State to hold checkbox value

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


    // Function to handle checkbox change
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked); // Update state based on checkbox checked value
    };

    const handleDateChange = (date) => {
        setDueDate(date);
    };


    useEffect(() => {
        // Fetch the data related to the ID
        api.get(`/tasks/${id}`)
            .then(response => {
                setTask(response.data.task.name); // Update the task state with fetched task name
                setItem(response.data.task);
                setDescription(response.data.task.description);
                setIsChecked(response.data.task.completed);
            })
            .catch(error => {
                console.error('Error fetching todo:', error);
            });
    }, [id]); // Fetch data when 'id' changes

    // Handling form submission to update the task

    const handleSubmit = (e) => {
        e.preventDefault();

        //api request to update todo
        api.patch(`/tasks/${id}`, { name: task, dueDate: dueDate, completed: isChecked })
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

    const handleDelete = (id) => {
        //sweet alert for warning to delete
        Swal.fire({
            title: "Are you sure You Want To Delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                //delete request to api
                api.delete(`/tasks/${id}`)
                    .then(response => {
                        updateTodo(); // Refreshing todos after deletion
                        navigate('/'); // Navigate back to the main page
                    })
                    .catch(error => {
                        console.error('Error deleting todo:', error);
                    });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Task has been deleted.",
                    icon: "success"
                });
            }
        });

    };

    return (
        <div className="container mx-auto font-serif">
            <Helmet>
                <title>Edit To Do</title>
            </Helmet>
            <h1 className="text-6xl font-bold text-center my-5">Edit Task</h1>

            <div className="mt-8 mx-2">
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
                        <label className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    onChange={handleCheckboxChange} // Assign the handler function to onChange event
                                    checked={isChecked} // Controlled checkbox, reflects the state value
                                />
                                <div className="w-6 h-6 border-2 rounded-md border-gray-400 flex items-center justify-center">
                                    {/* Checkmark icon */}
                                    {isChecked && (
                                        <svg
                                            className="w-4 h-4 text-green-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="ml-2 text-gray-700">Mark As Done</span> {/* Text label */}
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 py-2 px-4 rounded" > Update Task </button>
                    </div>
                </form>
                <div className="flex justify-between mt-5">
                    <button onClick={() => handleDelete(id)} className="bg-red-600 hover:bg-red-800 text-white font-bold  py-2 px-4 rounded" >Delete  Task </button>
                    <Link to={'/'}><button className=" bg-green-700 hover:bg-green-800 border rounded-md px-3 py-2 text-white ">Go Back</button></Link>

                </div>
            </div>
        </div>
    );
};

export default Edit;