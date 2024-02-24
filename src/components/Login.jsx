import { useState } from 'react'


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
                                <div className='flex items-center bg-gray-200 px-2 border rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800 font-thin">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>

                                    <input type="text" name="username" id="username" placeholder="Enter Email" onChange={getemail} value={email} className="w-full h-10 rounded-xl bg-gray-200 px-5 outline-none text-sm" />
                                </div>
                            </label>
                            <label htmlFor="password">
                                <div className='flex items-center bg-gray-200 px-2 border rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800 md:text-sm">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                    </svg>
                                    <input type="password" name="password" id="password" onChange={getpassword} placeholder="Password" className=" rounded-xl bg-gray-200 h-10 px-5 w-full  outline-none" />
                                </div>
                            </label>
                            <button className="mt-[20px] md:shadow-2xl rounded-full overflow-hidden">
                                <div className="w-full h-10 text-white  bg-gradient-to-r from-slate-50 via-orange-400 to-orange-600 flex justify-center items-center  text-sm font-bold ">Sign in <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6  ">
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