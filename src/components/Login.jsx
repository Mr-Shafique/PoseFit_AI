import { useState } from 'react'
import { GoKey } from "react-icons/go";
import { CiUser } from "react-icons/ci";

export default function Login() {

    const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const getemail = (e) => {
        setEmail(e.target.value)
        console.log(email)
    }

    function getpassword(e) {
        console.log(e.target.value)
    }
    







    return (

        <>
         <div className="h-svh bg-custom-bg  bg-no-repeat bg-right flex md:justify-center  items-center bg-cover font-mono ">
                <div className="md:w-[80%] w-[100%] h-[100%] flex items-center overflow-hidden flex-col md:flex-row md:py-[5%] " >

                    <div className="w-[100%] md:w-[50%] h-[100%] bg-login-bg sm:bg-login-bg2 bg-no-repeat bg-cover bg-center  sm:bg-cover">

                    </div>
                    <div className="bg-transparent w-[100%] md:w-[50%] h-[100%] p-8 flex items-center justify-center  absolute md:static md:bg-white ">
                        <form action="" className='w-[80%] flex flex-col gap-6'>
                        <label htmlFor="username">
                        <div className='flex items-center bg-gray-200  border rounded-[14px]'>
                        <CiUser className='text-black w-6 h-6 m-2'/>

                            <input type="text" name="username" id="username" placeholder="Enter Email" required onChange={getemail} value={email} className="w-full h-11 rounded-xl bg-gray-200 text-black   outline-none text-sm" />
                        </div>
                    </label>
                    <label htmlFor="password">
                        <div className='flex items-center bg-gray-200  border rounded-[14px]'>
                        <GoKey className='text-black w-6 h-6 m-2' />

                            <input type="password" name="password" id="password" onChange={getpassword} placeholder="Password" required className=" rounded-[14px] bg-gray-200 h-11  w-full  text-black outline-none" />
                        </div>
                    </label>
                            
                    <button className="mt-[20px] md:shadow-2xl rounded-[14px] overflow-hidden">
                        <div className="w-full h-11 text-white  bg-gradient-to-r from-slate-50 via-orange-400 to-orange-600 flex justify-center items-center  text-sm font-bold ">Sign in <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-11  ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        </div>

                    </button>
                            <div className="flex flex-col justify-center text-[#7b6f72] items-center">
                                <a href="www.google.com" className="text-xs text-white md:text-gray-500">Forgot Password?</a>
                                <a href="www.google.com" className="text-xs text-white md:text-gray-500">Register your Account <u>Signup</u></a>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>

    );

}