import { Link } from "react-router-dom";
import { FaPersonRunning } from "react-icons/fa6";
import { IoFootsteps } from "react-icons/io5";
import { RiUserFollowFill } from "react-icons/ri";



export default function Hero() {

    const heroimage = "./images/heroimage.png";
    // const bgimage = "./images/heroimage.png";
    // const bgimage = "./images/magicpattern-blob-1709669188492.png";

    return (

        <>
        <div style={{ backgroundColor: 'rgba(249, 85, 1, 0.8)' }} className="flex justify-center">

            {/* <div className="  " style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'auto', backgroundPosition : `center`, backgroundRepeat: `no-repeat`  }} > */}
                
                <div className=" container  relative md:p-10 p-0  ">
                    <div className="flex flex-col sm:flex-row ">

                                <div className="md:w-[70%] w-[100%] text-center ">
                                    <span className="font-extralight tracking-widest sm:text-[5rem] md:text-[7rem] lg:text-[10rem] text-[5rem] font-BebasNeue text-wrap">
                                        WORKOUT <br /> WITH
                                    <span  className="text-white"> AI</span>
                                    </span>
                                    <p className="font-inter text-lg text-white">
                                    Unleash Your Inner Strength: Elevate Your Fitness Journey with AI-Powered Pose Perfection!                                    </p>
                                </div>
                                
                                <div className=" flex md:w-[40%] w-[100%] mr-16 relative  ">
                                    <img src={heroimage} alt="heroimage" className=" z-10   w-full "  />
                                        <div className="w-36  h-14 rounded-xl absolute flex flex-col justify-center items-center font-bold text-white text-lg bg-[#ef8964] right-0 ">
                                        <FaPersonRunning className="self-start mx-10" />
                                        <span className="font-inter">
                                            4,95<sub>KM</sub>
                                        </span>

                                        </div>
                                        <div className="w-36  h-14 rounded-xl absolute flex flex-col justify-center items-center font-bold text-white text-sm bg-[#303030] top-1/3 ">
                                        <IoFootsteps className="self-start mx-10" />
                                        <span className="font-inter">
                                            Track your record
                                        </span>

                                        </div>
                                        <div className="w-36  h-14 rounded-xl absolute flex flex-col justify-center items-center font-bold text-white text-lg bg-[#7a29dc] right-0 top-3/4 ">
                                        <RiUserFollowFill className="self-start mx-10" />
                                        <span className="font-inter">
                                            Follow steps 
                                        </span>

                                        </div>
                                   
                                </div>
                    </div>

                </div>
            </div>

        </>
    )
}

 