
import { useState } from 'react';
import { LiaWeightSolid } from "react-icons/lia";
import { IoPeopleOutline } from "react-icons/io5";
import { GoKey } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { MdHeight } from "react-icons/md";
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';





export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic email validation
        if (!email.includes('@')) {
            toast.error("Please enter a valid email address", {
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

        // Weight and height numeric validation
        if (((weight === '') || isNaN(weight)) || (height === '' || isNaN(height))){
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

        // Form submission logic
        console.log('Form submitted successfully');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Gender:', gender);
        console.log('Weight:', weight);
        console.log('Height:', height);

        // Send data to server API
        fetch('https://api.example.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                gender,
                weight,
                height,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle response from server
                console.log('Response from server:', data);
                // TODO: Handle success or error response
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    };

    
    const imagebg = "./images/flat-lay-orange-weights-with-water-bottle-copy-space.jpg"
    const imageUrl="./images/high-angle-woman-running.jpg";


    return (
        <>
            <ToastContainer limit={2} />
        <div className="h-svh  flex md:justify-center  items-center  font-mono " style={{ backgroundImage: `url(${imagebg})`, backgroundSize: 'cover',backgroundRepeat:'no-repeat' }}>
                <div className="md:w-[80%] w-[100%] h-[100%] flex items-center overflow-hidden flex-col md:flex-row md:py-[5%] " >

                    <div className="w-[100%] md:w-[50%] h-[100%] " style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover',backgroundRepeat:'no-repeat', backgroundPosition:'center' }}>

                    </div>
                     <div className="bg-transparent w-[100%] md:w-[50%] h-[100%] p-8 flex items-center justify-center  absolute md:static md:bg-white">
                <form onSubmit={handleSubmit} className='w-[80%] flex flex-col gap-4'>
                    <label htmlFor="username">
                        <div className='flex items-center bg-gray-200  border rounded-[14px]'>
                        <FiUser className='text-black w-8 h-6 m-2 font-semibold'/>

                            <input type="text" name="username" id="username" placeholder="Enter Email"  onChange={handleEmailChange} value={email} className="w-full h-11 rounded-xl bg-gray-200 text-black   outline-none text-sm" />
                        </div>
                    </label>
                    <label htmlFor="password">
                        <div className='flex items-center bg-gray-200  border rounded-[14px]'>
                        <GoKey className='text-black w-8 h-6 m-2' />

                            <input type="password" name="password" id="password" onChange={handlePasswordChange} placeholder="Password"  className=" rounded-[14px] bg-gray-200 h-11  w-full  text-black outline-none" />
                        </div>
                    </label>



                    <label htmlFor="gender" className="flex items-center bg-gray-200  border rounded-[14px]">
                    <IoPeopleOutline className='text-black w-8  h-6 m-2' />
                        <select name="gender" id="gender"  onChange={handleGenderChange} className="rounded-xl bg-gray-200 h-11 text-black w-[100%] outline-none">
                            <option value="male" disabled selected className=''>Gender</option>
                            <option value="male" className=''>Male</option>
                            <option value="female" className=''>Female</option>
                        </select>
                    </label>


                    

                <div className='flex w-[100%]  rounded-xl justify-between'>
                    <div className='flex w-[80%] bg-gray-200 rounded-xl  items-center'>
                        <LiaWeightSolid className='w-8 h-8 m-2  text-gray-800' />
                        <input type="text" name='weight' id='weight' placeholder='Enter weight'   onChange={handleWeightChange} className=' bg-transparent border-none text-black  w-full h-11 rounded-xl outline-none'  />
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
                        <input type="text" name='height' id='height' placeholder='Enter Height'   onChange={handleHeightChange} className=' bg-transparent text-black border-none  w-full h-11 rounded-xl outline-none'  />
                    </div>
                    <div className='w-[15%] rounded-xl flex justify-center items-center bg-gradient-to-r from-orange-300 to-orange-600'>
                        <span className='text-white font-semibold '>
                            CM
                        </span>

                    </div>

                </div>
                   




                    <button className="mt-[20px] md:shadow-2xl rounded-[14px] overflow-hidden">
                        <div className="w-full h-11 text-white  bg-gradient-to-r from-slate-50 via-orange-400 to-orange-600 flex justify-center items-center  text-sm font-bold ">Sign up <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-11  ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        </div>

                    </button>
                    <div className="flex flex-col justify-center text-[#7b6f72] items-center">
                        <Link to="/"  className="text-xs text-white md:text-gray-500">Already have Account <u>Signin</u></Link>
                    </div>
                </form>
            </div>
                </div>

            </div>

        </>
    );
}