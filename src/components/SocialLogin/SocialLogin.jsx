import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                navigate('/');
            })

    };
    return (
        <div>
            <div className="divider"></div>
            <div className='w-full text-center my-4'>
                <div onClick={handleGoogleSignIn} className="btn btn-circle btn-outline cursor-pointer">
                    <FaGoogle></FaGoogle>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;