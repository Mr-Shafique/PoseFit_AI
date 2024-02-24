import { useState } from 'react'
import { LiaWeightSolid } from "react-icons/lia";
import { GiBodyHeight } from "react-icons/gi";


export default function Signup() {

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
                     <div className="bg-transparent w-[100%] md:w-[50%] h-[100%] p-8 flex items-center justify-center  absolute md:static md:bg-white border-2 border-red-400">
                <form action="" className='w-[80%] flex flex-col gap-4'>
                    <label htmlFor="username">
                        <div className='flex items-center bg-gray-200 px-2 border rounded-[14px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-[48px] text-gray-800 font-thin">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>

                            <input type="text" name="username" id="username" placeholder="Enter Email" required onChange={getemail} value={email} className="w-full h-[48px] rounded-xl bg-gray-200  outline-none text-sm" />
                        </div>
                    </label>
                    <label htmlFor="password">
                        <div className='flex items-center bg-gray-200 px-2 border rounded-[14px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-[48px] text-gray-800 md:text-sm">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                            </svg>
                            <input type="password" name="password" id="password" onChange={getpassword} placeholder="Password" required className=" rounded-[14px] bg-gray-200 h-[48px]  w-full  outline-none" />
                        </div>
                    </label>



                    <label htmlFor="gender" className="flex items-center bg-gray-200 px-2 border rounded-[14px]">
                        <svg xmlns="http://www.w3.org/2000/svg" height="25px" fill="currentColor" className="bi bi-gender-ambiguous text-gray-800" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z" />
                        </svg>

                        <select name="gender" id="gender" required className="rounded-xl bg-gray-200 h-[48px]  w-[100%] outline-none">
                            <option value="male" disabled selected className=''>Gender</option>
                            <option value="male" className=''>Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>


                    

                <div className='flex w-[100%]  rounded-xl justify-between'>
                    <div className='flex w-[80%] bg-gray-200 rounded-xl px-2'>
                        <LiaWeightSolid className='w-8 h-[48px] text-gray-800' />
                        <input type="text" name='weight' id='weight' placeholder='Enter weight'  required className=' bg-transparent border-none mx-2 w-full h-[48px] rounded-xl outline-none'  />
                    </div>
                    <div className='w-[20%] rounded-xl flex justify-center items-center bg-gradient-to-r from-orange-300 to-orange-600'>
                        <span className='font-normal text-white '>
                            KG
                        </span>

                    </div>

                </div>

                <div className='flex w-[100%]  rounded-xl justify-between'>
                    <div className='flex w-[80%] bg-gray-200 rounded-xl px-2'>
                        <GiBodyHeight className='w-8 h-[48px] text-gray-800' />
                        <input type="text" name='height' id='height' placeholder='Enter Height'  required className=' bg-transparent border-none mx-2 w-full h-[48px] rounded-xl outline-none'  />
                    </div>
                    <div className='w-[20%] rounded-xl flex justify-center items-center bg-gradient-to-r from-orange-300 to-orange-600'>
                        <span className='font-normal text-white '>
                            CM
                        </span>

                    </div>

                </div>
                   




                    <button className="mt-[20px] md:shadow-2xl rounded-[14px] overflow-hidden">
                        <div className="w-full h-[48px] text-white  bg-gradient-to-r from-slate-50 via-orange-400 to-orange-600 flex justify-center items-center  text-sm font-bold ">Sign in <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-[48px]  ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        </div>

                    </button>
                    <div className="flex flex-col justify-center text-[#7b6f72] items-center">
                        <a href="www.google.com" className="text-xs text-white md:text-gray-500">Forgot Password?</a>
                        <a href="www.google.com" className="text-xs text-white md:text-gray-500">Register your Account <u>Signup</u></a>
                    </div>
                    <p>
                        {email}
                    </p>
                </form>
            </div>
                </div>

            </div>
        </>

    );

}