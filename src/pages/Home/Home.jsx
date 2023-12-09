import Tasks from "../../components/Tasks/Tasks";
import TodoForm from "../../components/TodoForm/TodoForm";

const Home = () => {
    return (
        <div className="font-serif mx-2">
            <h1 className="text-6xl font-bold text-center my-5">Add Task</h1>
            <TodoForm name={"Add Task"}></TodoForm>

            <Tasks></Tasks>

        </div>
    );
};

export default Home;