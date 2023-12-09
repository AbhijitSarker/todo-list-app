import { useEffect, useState } from "react";
import TodoForm from "../../components/TodoForm/TodoForm";
import { useParams } from 'react-router-dom';
import api from "../../utils/HandleApi";

const Edit = () => {
    const { id } = useParams();
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');

    console.log(id);
    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    useEffect(() => {
        // Fetch the data related to the ID
        api.get(`/tasks/${id}`)
            .then(response => {
                console.log(response.data.task.name)
                setTask(response.data.task.name)
            })
            .catch(error => {
                console.error('Error fetching todo:', error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        api.patch(`/tasks/${id}`, { name: task })
            .then(response => {
                console.log('Todo updated:', response.data);
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
                        {
                            location.pathname === '/edit' && <Link to={'/'}><button className="float-right border rounded-md px-3 py-2 text-white bg-red-600">Go Back</button></Link>

                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;