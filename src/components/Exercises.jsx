import { Link } from "react-router-dom";

const exercise = {
    PLANK: {
        title: "PLANK",
        image: "/images/plank.jpg",
        description: "The plank is an isometric   core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time The plank is an isometric   core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time."
    },
    squat: {
        title: "squats",
        image: "/images/squat.jpg",
        description: "The sit-up is an abdominal endurance training exercise to strengthen, tighten and tone the abdominal muscles."
    }
}


export default function App() {




    return (
        <>
        <div className=" flex justify-center">

        
            <div className="p-4 container  border-red-200">
                <div className="">

                    <h1 className="text-5xl text-[#F95501]">Exercises</h1>
                    <small>Choose exercise you want to train yourself on</small>
                </div>

                <div className=" flex  flex-col" >
                    <div className="flex   rounded-lg my-4 hover:shadow-2xl">
                       <div className="w-[80%] p-4 ">
                        <h2 className="text-2xl font-semibold text-[#F95501]">{exercise.PLANK.title}</h2>
                        <p className="text-black">{exercise.PLANK.description}</p>
                        <Link to="/Exercises/Plank" className="text-white">Start</Link>
                       </div>
                        <div className="">
                        <img src={exercise.PLANK.image} alt="plank" className="w-80 " />
                        </div>
                    </div>

                    <div className="flex  rounded-lg my-4 hover:shadow-2xl ">
                       <div className="w-[80%] p-4">
                        <h2 className="text-2xl font-semibold text-[#F95501]">{exercise.squat.title}</h2>
                        <p className="text-black">{exercise.squat.description}</p>
                        <Link to="/Exercises/Squats" className="text-white">Start</Link>

                       </div>
                       <div>
                        <img src={exercise.squat.image} alt="squat" className="w-80 " />

                       </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}