import TableComponent from "../../components/Tasks/Tasks";
import TodoForm from "../../components/TodoForm/TodoForm";

const Edit = () => {
    return (
        <div className="container mx-auto font-serif">
            <h1 className="text-6xl font-bold text-center my-5">Edit Task</h1>

            <TodoForm name={'Update Task'}></TodoForm>
        </div>
    );
};

export default Edit;