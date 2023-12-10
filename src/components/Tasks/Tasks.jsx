import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import api from "../../utils/HandleApi";
import Swal from 'sweetalert2'
import useTodo from "../../hooks/useTodo";

const Tasks = () => {
    const { todo, updateTodo } = useTodo(); // Using the TodoProvider

    const sortedTodo = [...todo].reverse();  // Reversing the todo list to sort the latest task on top

    // Function to handle the deletion of a task
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
    // Function to mark a task as done
    const markAsDone = (id) => {
        api.patch(`/tasks/${id}`, { completed: true }) //patch request to api
            .then(response => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Marked As Done",
                    showConfirmButton: false,
                    timer: 1500
                });
                updateTodo(); // Refreshing todos after marking as done
            })
            .catch(error => {
                console.error('Error updating todo:', error);
            });
    }

    // Function to mark a task as due
    const markAsDue = (id) => {
        api.patch(`/tasks/${id}`, { completed: false }) //patch request to api
            .then(response => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Marked As Due",
                    showConfirmButton: false,
                    timer: 1500
                });
                updateTodo(); // Refreshing todos after marking as due
            })
            .catch(error => {
                console.error('Error updating todo:', error);
            });
    };

    const dateFormatter = (dueDate) => {
        const inputDate = dueDate;
        const date = new Date(inputDate);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate;
    }

    return (
        <div className="flex justify-center items-center  mt-10 container mx-auto">
            <table className="min-w-full border rounded-lg overflow-x-scroll">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Task</th>
                        <th className="py-2 px-4">Due Date</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-100">
                    {sortedTodo.map((item) =>
                        <tr
                            key={item._id}
                            className="text-center hover:bg-gray-200 transition-colors"
                        >
                            <td className="py-2 px-4 text-4xl">
                                {
                                    item.completed ? <div className="flex justify-center text-green-800 cursor-pointer"> <IoCheckmarkDoneCircle onClick={() => markAsDue(item._id)} className="cursor-pointer rounded-full" />  </div>
                                        : <div className="flex justify-center text-neutral-700"><IoCheckmarkDoneCircleOutline onClick={() => markAsDone(item._id)} className="cursor-pointer hover:text-green-800 rounded-full" /></div>
                                }
                            </td>
                            <td className="py-3 px-2">{item.name}</td>
                            <td className="py-3 px-2">{dateFormatter(item.dueDate)}</td>
                            <td className="py-3 px-2">
                                <div className="flex justify-center items-center">
                                    <Link to={`/edit/${item._id}`}><button className="flex justify-center items-center gap-1 border rounded-md px-3 py-2 text-white bg-green-800"><FaEdit /></button></Link>
                                    <button onClick={() => handleDelete(item._id)} className="flex justify-center items-center gap-1 border rounded-md px-3 py-2 text-white bg-red-600"><RiDeleteBin6Fill /></button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Tasks;
