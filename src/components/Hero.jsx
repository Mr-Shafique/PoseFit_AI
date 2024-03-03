import { Link } from "react-router-dom";
export default function Hero() {

    const heroimage = "./images/heroimage.png";

    return (

        <>
            <div className="flex justify-center">
                <div className="h-svh  relative md:p-10 p-0 container bg-slate-400 ">
                    <div className="flex flex-col sm:flex-row ">

                                <div className="w-[70%]">
                                    <span className="sm:text-[2rem]  md:text-[5rem] xl:text-[10rem] text-wrap">
                                        WORKOUT <br /> WITH
                                    <Link to={"/signup"} className="text-white"> <u>AI</u></Link>
                                    </span>
                                </div>
                                
                                <div className=" flex md:w-[40%] w-[100%] mr-16 relative  ">
                                    <img src={heroimage} alt="heroimage" className=" z-10  border-2 w-full "  />
                                        <div className="w-36  h-14 rounded-xl absolute  bg-[#ef8964] right-0 "></div>
                                        <div className="w-36  h-14 rounded-xl absolute  bg-[#303030] top-1/3 "></div>
                                        <div className="w-36  h-14 rounded-xl absolute  bg-[#7a29dc]  right-[-25px] top-3/4"></div>
                                   
                                </div>
                    </div>

                </div>
            </div>

        </>
    )
}