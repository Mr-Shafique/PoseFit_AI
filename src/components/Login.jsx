import { useState } from 'react'
import { GoKey } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';
// import Redalert from './Redalert';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') // Step 1: Uncomment or add this line
    // const [showAlert, setShowAlert] = useState(false);

    const getemail = (e) => {
        setEmail(e.target.value)
    }

    const getpassword = (e) => { // Step 2: Update this function
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        // Step 3: Implement validation
        if (!email || !password) {
                toast.error("Email and password are required", {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Zoom,
            });
            return;
        }
        // Add more specific validations as needed, e.g., regex for email format, password length, etc.
        if (!/\S+@\S+\.\S+/.test(email)) {

            toast.error("Enter valid email", {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Zoom,
            });
            return;
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long", {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Zoom,
            });
            return;


        }

        // If all validations pass, proceed with form submission logic
        console.log("Form submitted with Email:", email, "Password:", password);
        // Here, you would typically send the data to your server or perform other actions
    }

    const imageUrl = "./images/high-angle-woman-running.jpg";
    const imagebg = "./images/flat-lay-orange-weights-with-water-bottle-copy-space.jpg"

    return (
        <>
            <ToastContainer />
            <div className="h-svh  bg-no-repeat bg-right flex md:justify-center  items-center  font-mono " style={{ backgroundImage: `url(${imagebg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} >
                <div className="md:w-[80%] w-[100%] h-[100%] flex items-center overflow-hidden flex-col md:flex-row md:py-[5%] " >

                    <div className="w-[100%] md:w-[50%] h-[100%] " style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition:'center' }}>

                    </div>
                    <div className="bg-transparent w-[100%] md:w-[50%] h-[100%] p-8 flex items-center justify-center  absolute md:static md:bg-white ">
                        <form onSubmit={handleSubmit} className='w-[80%] flex flex-col gap-6'>
                            <label htmlFor="username">
                                <div className='flex items-center bg-gray-200  border rounded-[14px]'>
                                    <CiUser className='text-black w-6 h-6 m-2' />

                                    <input type="text" name="username" id="username" placeholder="Enter Email" onChange={getemail} value={email}  className="w-full h-11 rounded-xl bg-gray-200 text-black   outline-none text-sm" />
                                </div>
                            </label>
                            <label htmlFor="password">
                                <div className='flex items-center bg-gray-200  border rounded-[14px]'>
                                    <GoKey className='text-black w-6 h-6 m-2' />

                                    <input type="password" name="password" id="password" onChange={getpassword} placeholder="Password" className=" rounded-[14px] bg-gray-200 h-11  w-full  text-black outline-none" />
                                </div>
                            </label>

                            <button className="mt-[20px] md:shadow-2xl rounded-[14px] overflow-hidden" >
                                <div className="w-full h-11 text-white  bg-gradient-to-r from-slate-50 via-orange-400 to-orange-600 flex justify-center items-center  text-sm font-bold ">Sign in <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-11  ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                </div>

                            </button>

                            <div className="flex flex-col justify-center text-[#7b6f72] items-center">
                                <a href="www.google.com" className="text-xs text-white md:text-gray-500">Forgot Password?</a>
                                <Link to="/signup" className="text-xs text-white md:text-gray-500">Register your Account <u>Signup</u></Link>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>

    );

}