import { Link } from "react-router-dom";

const exercise = {
    PLANK: {
        title: "PLANK EXERCISE",
        image: "/images/plank.jpg",
        description: "The plank is an isometric   core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time The plank is an isometric   core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time."
    },
    squat: {
        title: "SQUAT  EXERCISE",
        image: "/images/squat.jpg",
        description: "The sit-up is an abdominal endurance training exercise to strengthen, tighten and tone the abdominal muscles."
    }
}


export default function App() {




    return (
        <>
        <div className=" mb-40">

        
            <div className="p-4   border-red-200">
                <div className="">

                    <h1 className="text-5xl font-semibold text-[#F95501]">Exercises</h1>
                    <small>Choose exercise you want to train yourself on</small>
                </div>

                <div className=" flex  flex-col" >
                    <div className="flex   rounded-xl my-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                       <div className="w-[80%] p-8 flex flex-col justify-between ">
                        <div>

                        <h2 className="text-2xl font-semibold text-[#F95501]">{exercise.PLANK.title}</h2>
                        <p className="text-black">{exercise.PLANK.description}</p>
                        </div>
                        <div>

                        <button className="bg-[#F95501] w-40 h-14 rounded-lg">

                        <Link to="/Exercises/Planks" className="text-white font-semibold">Start</Link>
                        </button>
                        </div>
                       </div>
                        <div className="">
                        <img src={exercise.PLANK.image} alt="plank" className="w-80 rounded-xl " />
                        </div>
                    </div>

                    

                    <div className="flex  rounded-xl my-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ">
                       <div className="w-[80%] p-8 flex flex-col justify-between ">
                        <div>

                        <h2 className="text-2xl font-semibold text-[#F95501]">{exercise.squat.title}</h2>
                        <p className="text-black">{exercise.squat.description}</p>
                        </div>
                        <div>


                        <button className="bg-[#F95501] w-40 h-14 rounded-lg">

                        <Link to="/Exercises/Squats" className="text-white font-semibold">Start</Link>
                        </button>
                        </div>

                       </div>
                       <div>
                        <img src={exercise.squat.image} alt="squat" className="w-80 rounded-xl " />

                       </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}