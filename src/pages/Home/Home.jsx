import Tasks from "./Tasks/Tasks";

const Home = () => {
    return (
        <div>
            <div className="container mx-auto my-20 font-serif gradient__text">
                <input className="border py-2 px-4 rounded-md" type="text" placeholder={'Add your Task'} />
                <button className="border py-2 px-4 rounded-md">Add Task</button> <br />
                <div>
                    <label htmlFor="">Description</label>  <br />
                    <textarea className="border" name="" id="" cols="30" rows="5"></textarea>
                </div>
            </div>

            <div>
                <Tasks></Tasks>
            </div>
        </div>
    );
};

export default Home;