
const Home = () => {
    return (
        <div className="container mx-auto my-20 font-serif gradient__text">
            <input className="border py-2 px-4 rounded-md" type="text" placeholder={'Add your Task'} />
            <button className="border py-2 px-4 rounded-md">Add Task</button>
        </div>
    );
};

export default Home;