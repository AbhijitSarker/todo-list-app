import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaGoogle, FaGithub } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const SignIn = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        console.log(data);
        login(data.email, data.password)
            .then(result => {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Created successfully",
                    showConfirmButton: false,
                    timer: 1000
                });

                navigate(from, { replace: true });
            })
            .then(error => {
            });
    };
    return (
        <div>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <div className=''>

                <div className="md:w-1/2 flex flex-col justify-center items-center mb-8">

                    <form onSubmit={handleSubmit(onSubmit)} className="md:w-2/3 mx-2 md:mx-auto mt-8 p-6 border border-[#E6E6E6] bg-white  shadow-md rounded-md">
                        <h2 className='text-3xl font-bold mb-8'>Sign In</h2>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email:</label>
                            <input type="email" id="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} className="p-2 rounded-md w-full bg-[#F3F3F3]" />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password:</label>
                            <input type="password" id="password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} className="p-2 rounded-md w-full bg-[#F3F3F3]" />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>
                        <button type="submit" className="w-full bg-[#F7A582] hover:bg-[#ff8a54] text-white font-semibold py-2 px-4 rounded-md">Sign In</button>
                        <div className='mt-2'>
                            Dont Have An Account? <Link to={'/signup'}><span className='text-[#F7A582] text-lg font-medium'>Sign Up</span></Link>
                        </div>
                        <div className="border-t border-gray-300 mt-4"></div>
                        <p className='text-center'>Or sign in with</p>
                        <div className="border-t border-gray-300 mb-4"></div>
                        <div className='flex justify-evenly text-3xl text-[#07332F]'>
                            <SocialLogin></SocialLogin>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default SignIn;