import { Helmet } from "react-helmet-async";
import AddTask from "../../components/AddTask/AddTask";
import Tasks from "../../components/Tasks/Tasks";

const Home = () => {
    return (
        <div className="font-serif mx-2">
            <Helmet>
                <title>To Do List</title>
            </Helmet>
            <h1 className="text-6xl font-bold text-center my-5">Add Task</h1>

            <AddTask></AddTask>
            <Tasks></Tasks>

        </div>
    );
};

export default Home;