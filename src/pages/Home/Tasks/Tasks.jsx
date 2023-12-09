import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const TableComponent = () => {
    // Static data for demonstration
    const data = [
        { _id: 1, task: 'Finish project', completed: false },
        { _id: 2, task: 'Go to the gym', completed: true },
        { _id: 1, task: 'Finish project', completed: false },
        { _id: 3, task: 'Buy groceries', completed: false },
        { _id: 2, task: 'Go to the gym', completed: true },
        { _id: 3, task: 'Buy groceries', completed: false },
        // Add more sample data as needed
    ];

    return (
        <div className="flex justify-center items-center  mt-10 container mx-auto">
            <table className="min-w-full border rounded-lg overflow-x-scroll">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Task</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-100">
                    {data.map((item) => (
                        <tr
                            key={item._id}
                            className="text-center hover:bg-gray-200 transition-colors"
                        >
                            <td className="py-2 px-4 text-4xl">
                                {
                                    item.completed ? <div > <IoCheckmarkDoneCircle />  </div>
                                        : <div className="hover:bg-slate-400 text-neutral-700"><IoCheckmarkDoneCircleOutline /></div>
                                }
                            </td>
                            <td className="py-3 px-4">{item.task}</td>
                            <td className="py-3 px-4">{item.completed ? 'Completed' : 'Pending'}</td>
                            <td className="py-3 px-4">
                                <div className="flex justify-around items-center">
                                    <button className="flex justify-center items-center gap-1 border rounded-md px-3 py-2 text-white bg-green-800"><FaEdit />Edit</button>
                                    <button className="flex justify-center items-center gap-1 border rounded-md px-3 py-2 text-white bg-red-600"><RiDeleteBin6Fill />Delete</button>
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
