import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/HandleApi";
import { useTodo } from "../../provider/TodoProvider";


const TableComponent = () => {
    const { todo, loading, updateTodo } = useTodo();

    const sortedTodo = [...todo].reverse();

    const handleDelete = (id) => {

        api.delete(`/tasks/${id}`)
            .then(response => {
                updateTodo()
                console.log('Todo deleted');
            })
            .catch(error => {
                console.error('Error deleting todo:', error);
            });
    };

    const markAsDone = (id) => {
        api.patch(`/tasks/${id}`, { completed: true })
            .then(response => {
                updateTodo()
                console.log('Todo updated:', response.data);
            })
            .catch(error => {
                console.error('Error updating todo:', error);
            });
    }

    const markAsDue = (id) => {
        api.patch(`/tasks/${id}`, { completed: false })
            .then(response => {
                updateTodo()
                console.log('Todo updated:', response.data);
            })
            .catch(error => {
                console.error('Error updating todo:', error);
            });
    };

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
                    {sortedTodo.map((item) => (
                        <tr
                            key={item._id}
                            className="text-center hover:bg-gray-200 transition-colors"
                        >
                            <td className="py-2 px-4 text-4xl">
                                {
                                    item.completed ? <div onClick={() => markAsDue(item._id)} className="flex justify-center text-green-800"> <IoCheckmarkDoneCircle />  </div>
                                        : <div onClick={() => markAsDone(item._id)} className="flex justify-center text-neutral-700"><IoCheckmarkDoneCircleOutline className=" hover:text-green-800 rounded-full" /></div>
                                }
                            </td>
                            <td className="py-3 px-2">{item.name}</td>
                            <td className="py-3 px-2">Dec 9, 2023</td>
                            <td className="py-3 px-2">
                                <div className="flex justify-center items-center">
                                    <Link to={`/edit/${item._id}`}><button className="flex justify-center items-center gap-1 border rounded-md px-3 py-2 text-white bg-green-800"><FaEdit /></button></Link>
                                    <button onClick={() => handleDelete(item._id)} className="flex justify-center items-center gap-1 border rounded-md px-3 py-2 text-white bg-red-600"><RiDeleteBin6Fill /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
