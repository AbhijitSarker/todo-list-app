import React from 'react';

const Header = () => {
    return (
        <div className='bg-[#040C18] text-white font-serif'>
            <div className='container mx-auto py-5 flex items-center justify-between'>
                <h1 className='text-5xl font-bold '>TODO LIST</h1>
                <h3>Hello User</h3>
            </div>
        </div>
    );
};

export default Header;