import React from 'react';
import Feedback from './Feedback';
import SessionHistoryTable from './SessionHistoryTable';
import Nav from './Nav';

export default function Profile() {


    return (
        <>
        <Nav />
        <div className='flex justify-center m-0'>

            <div className='flex flex-col p-4 container '>

                <div className='flex flex-col '>

                    <div className='flex w-12/12 h-1/6   mb-4'>
                        <div className='w-4/12  flex justify-center items-center'>
                            <img src="./images/Rectangle 5933.png" alt="./images/Rectangle 5933.png" className='  ' />
                        </div>
                        <div className='w-full   pl-4 text-xs sm:text-lg gap-1  flex flex-col '>
                            <div className=' bg-[#e5e7eb] rounded-lg flex items-center pl-4 h-1/5'>USERNAME</div>
                            <div className=' bg-[#e5e7eb] rounded-lg flex items-center pl-4 h-1/5'>EMAIL</div>
                            <div className=' bg-[#e5e7eb] rounded-lg flex items-center pl-4 h-1/5'>AGE</div>
                            <div className=' bg-[#e5e7eb] rounded-lg flex items-center pl-4 h-1/5'>HEIGHT</div>
                            <div className=' bg-[#e5e7eb] rounded-lg flex items-center pl-4 h-1/5'>WEIGHT</div>
                        </div>

                        






                    </div>
                    <div className="collapse p-4 collapse-arrow bg-base-200 mb-4" >
                       <div className='text-xl font-semibold p-4'>
                        Plank exercise
                       </div>
                       
                     
                        <div className=" flex flex-col   justify-between  sm:flex-row  gap-2 ">
                            <div className=" flex justify-between p-2 px-4 w-full bg-green-400 h-10 rounded-lg text-white font-medium  sm:w-[30%]">
                                <p>Correct </p>
                                <p>number</p>
                            </div>
                            <div className=" w-full  bg-[#f95501] h-10 rounded-lg flex justify-between p-2 px-4 text-white font-medium  sm:w-[30%]">
                                <p>Wrong</p>
                                <p>number</p>
                            </div>
                        </div>
                    </div>
                    <div className="collapse p-4 collapse-arrow bg-base-200  ">
                       <div className='text-xl font-semibold p-4'>
                        Plank exercise
                       </div>
                       
                    
                        <div className=" flex flex-col   justify-between  sm:flex-row  gap-2 ">
                            <div className=" flex justify-between p-2 px-4 w-full bg-green-400 h-10 rounded-lg text-white font-medium  sm:w-[30%]">
                                <p>Correct </p>
                                <p>number</p>
                            </div>
                            <div className=" w-full  bg-[#f95501] h-10 rounded-lg flex justify-between p-2 px-4 text-white font-medium  sm:w-[30%]">
                                <p>Wrong</p>
                                <p>number</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-4  border-none rounded-lg overflow-scroll'>
                        <Feedback />
                        <Feedback />
                    </div>
                </div>
                <SessionHistoryTable />
            </div>
        </div>
        </>
    );
}


