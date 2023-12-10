import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useAuth();
    console.log(user);
    return (
        <div className='bg-[#040C18] text-white font-serif'>
            <div className='container mx-auto py-5 flex items-center justify-between'>
                <h1 className='text-5xl font-bold '>TODO LIST</h1>

                {
                    user ? <> <button onClick={logout} className='border rounded-md px-3'>Logout</button>
                        <h3>Hello {user.email}</h3>
                    </>
                        : <Link to={'/signup'}><button className='border rounded-md px-3'>LogIn</button></Link>
                }
            </div>
        </div>
    );
};

export default Header;