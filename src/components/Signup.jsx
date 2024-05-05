
import { useState } from 'react';
import { LiaWeightSolid } from "react-icons/lia";
import { IoPeopleOutline } from "react-icons/io5";
import { GoKey } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { MdHeight } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { CiCalendarDate } from "react-icons/ci";
import axios from 'axios';




export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [username, setUsername] = useState('')
    const [age, setAge] = useState('')

    const [isSigningUp, setIsSigningUp] = useState(false); // State to track signup process

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleageChange = (e) => {
        setAge(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic email validation
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

        // Password length validation
        if (password.length < 8 || password.length === 0) {
            toast.error("Enter the password ,Password must be at least 8 characters long", {
                position: "top-center",
                autoClose: 800,
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
        if (username === '') {
            toast.error("Please enter username", {
                position: "top-center",
                autoClose: 800,
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

        // Gender selection validation
        if (gender === '') {
            toast.error("Please select a gender", {
                position: "top-center",
                autoClose: 800,
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

        if (age === '') {
            toast.error("Please enter age", {
                position: "top-center",
                autoClose: 800,
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

        // Weight and height numeric validation
        if (((weight === '') || isNaN(weight)) || (height === '' || isNaN(height))) {
            toast.error("Weight and height must be numeric values", {
                position: "top-center",
                autoClose: 800,
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
        
        if (isSigningUp) {
            return; // If signup process is already in progress, exit early to prevent multiple submits
        }

        try {
            setIsSigningUp(true);  // Set the signing up state to true
            const response = await axios.post('http://127.0.0.1:5000/auth/register', {
                username,
                email,
                password,
                gender,
                age,
                height,
                weight
            });

            // Handle response from server
            console.log('Response from server:', response.data);
            toast.success("Signup successful", { theme: "colored" });

            if (response.status === 200 || response.status === 201) {
                navigate('/');  // Navigate to the Main page upon successful signup
            }
        } catch (error) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            toast.error("Signup failed: " + (error.response ? error.response.data.message : "Unable to connect"), { theme: "colored" });
        } finally {
            setIsSigningUp(false);  // Reset the signing up state
        }



        // Form submission logic
        console.log('Form submitted successfully');
        console.log('Email:', email);
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Age:', age);
        console.log('Gender:', gender);
        console.log('Weight:', weight);
        console.log('Height:', height);
    };


    const imagebg = "./images/flat-lay-orange-weights-with-water-bottle-copy-space.jpg"
    const imageUrl = "./images/high-angle-woman-running.jpg";


    return (
        <>
            <ToastContainer limit={2} />
            <div className="h-svh  flex md:justify-center justify-center  items-center  font-mono " style={{ backgroundImage: `url(${imagebg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                <div className="md:w-11/12 w-12/12 h-[100%] flex items-center justify-center container  flex-col md:flex-row md:py-6 " >

                    <div className="w-full md:w-5/12 h-[100%] " style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>

                    </div>
                    <div className="bg-transparent w-[100%] md:w-6/12 h-full flex items-center justify-center  absolute md:static md:bg-white">
                        <form onSubmit={handleSubmit} className='w-3/4 h-5/6 flex flex-col gap-4'>
                            <label htmlFor="email">
                                <div className='flex items-center bg-gray-200  border rounded-[14px]'>
                                    <FiUser className='text-black w-8 h-6 m-2 font-semibold' />

                                    <input type="text" name="email" id="email" placeholder="Enter Email" onChange={handleEmailChange} value={email} className="w-full h-8 rounded-xl bg-gray-200 text-black   outline-none text-sm" />
                                </div>
                            </label>
                            <label htmlFor="password">
                                <div className='flex items-center bg-gray-200  border rounded-[14px]'>
                                    <GoKey className='text-black w-8 h-6 m-2' />

                                    <input type="password" name="password" id="password" onChange={handlePasswordChange} placeholder="Password" className=" rounded-[14px] bg-gray-200 h-8  w-full  text-black outline-none" />
                                </div>
                            </label>
                            <label htmlFor="username">
                                <div className='flex items-center bg-gray-200  border rounded-[14px]'>
                                    <FiUser className='text-black w-8 h-6 m-2 font-semibold' />

                                    <input type="text" name="username" id="username" placeholder="Enter username" onChange={handleUsernameChange} value={username} className="w-full h-8 rounded-xl bg-gray-200 text-black   outline-none text-sm" />
                                </div>
                            </label>




                            <label htmlFor="gender" className="flex items-center bg-gray-200  border rounded-[14px]">
                                <IoPeopleOutline className='text-black w-8  h-6 m-2' />
                                <select name="gender" id="gender" onChange={handleGenderChange} className="rounded-xl bg-gray-200 h-8 text-black w-[100%] outline-none">
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </label>

                            <label htmlFor="age" className='flex items-center bg-gray-200  border rounded-[14px]'>
                                <CiCalendarDate className='text-black w-8  h-6 m-2' />
                                <input type="number" name='age' id='age' placeholder='Enter age' onChange={handleageChange} value={age} className=' bg-transparent border-none text-black  w-full h-8 rounded-xl outline-none decoration-none' />

                            </label>



                            <div className='flex w-[100%]  rounded-xl justify-between'>
                                <div className='flex w-[80%] bg-gray-200 rounded-xl  items-center'>
                                    <LiaWeightSolid className='w-8 h-8 m-2  text-gray-800' />
                                    <input type="number" name='weight' id='weight' placeholder='Enter weight' onChange={handleWeightChange} className=' bg-transparent border-none text-black  w-full h-8 rounded-xl outline-none' />
                                </div>
                                <div className='w-[15%] rounded-xl flex justify-center items-center bg-gradient-to-r from-orange-300 to-orange-600'>
                                    <span className='font-normal text-white '>
                                        KG
                                    </span>

                                </div>

                            </div>

                            <div className='flex w-[100%]  rounded-xl justify-between'>
                                <div className='flex w-[80%] bg-gray-200 items-center rounded-xl '>
                                    <MdHeight className='text-black w-8  h-6 m-2 ' />
                                    <input type="number" name='height' id='height' placeholder='Enter Height' onChange={handleHeightChange} className=' bg-transparent text-black border-none  w-full h-8 rounded-xl outline-none' />
                                </div>
                                <div className='w-[15%] rounded-xl flex justify-center items-center bg-gradient-to-r from-orange-300 to-orange-600'>
                                    <span className='text-white font-semibold '>
                                        CM
                                    </span>

                                </div>

                            </div>

                            <button
                                className="md:shadow-2xl border-none btn rounded-xl bg-gradient-to-r from-slate-50 via-orange-400 to-orange-600 text-white"
                                onClick={handleSubmit}
                                disabled={isSigningUp} // Disable the button while signup process is ongoing
                            >
                                {isSigningUp ? 'Signing Up...' : 'Sign up'}
                            </button>
                            <Link to="/main" className="text-xs text-white md:text-gray-500">Already have Account <u>Signin</u></Link>
                            {/* <div className="flex flex-col justify-center text-[#7b6f72] items-center">
                            </div> */}
                        </form>
                    </div>
                </div>

            </div>

        </>
    );
}