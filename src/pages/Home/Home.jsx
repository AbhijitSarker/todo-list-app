import TableComponent from "../../components/Tasks/Tasks";
import AddTask from "../../components/AddTask/AddTask";

const Home = () => {
    return (
        <div className="font-serif mx-2">
            <h1 className="text-6xl font-bold text-center my-5">Add Task</h1>

            <AddTask></AddTask>
            <TableComponent></TableComponent>

        </div>
    );
};

export default Home;