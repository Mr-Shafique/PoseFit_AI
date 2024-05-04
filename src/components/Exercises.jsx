// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const exercise = {
    PLANK: {
        title: "PLANK EXERCISE",
        image: "/images/plank.jpg",
        description: "The plank is an isometric core strength exercise."
    },
    squat: {
        title: "SQUAT  EXERCISE",
        image: "/images/squat.jpg",
        description: "The sit-up is an abdominal endurance training exercise."
    }
}


export default function App() {

    const navigate = useNavigate();

    const planchange = () => {
      navigate('/PlankExercise');
    }
    const squatchange = () => {
        navigate('/SquatExercise');
      }

    return (
        <>
            <div className=" mb-40 flex justify-center">


                <div className="p-4  container  ">
                    <div className="">

                        <h1 className="text-5xl font-semibold text-[#F95501]">Exercises</h1>
                        <small>Choose exercise you want to train yourself on</small>
                    </div>

                    <div className=" flex  flex-col" >
                        <div className="flex md:flex-row flex-col  rounded-xl my-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                            <div className="w-[80%] p-8 flex flex-col justify-between ">
                                <div>

                                    <h2 className="text-2xl font-semibold text-[#F95501]">{exercise.PLANK.title}</h2>
                                    <p className="text-black text-sm">{exercise.PLANK.description}</p>
                                </div>
                                <div>

                                    {/* Open the modal using document.getElementById('ID').showModal() method */}

                                    <button className="bg-[#fb884e] hover:bg-[#F95501] btn w-40 h-14 hover:text-white  rounded-lg drop-shadow-xl"onClick={planchange} >Start Exercise


                                    </button>
                                   
                                </div>
                            </div>
                            <div className="">
                                <img src={exercise.PLANK.image} alt="plank" className="w-80 rounded-xl " />
                            </div>
                        </div>



                        <div className="flex md:flex-row flex-col rounded-xl my-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ">
                            <div className="w-[80%] p-8 flex flex-col justify-between ">
                                <div>

                                    <h2 className="text-2xl font-semibold text-[#F95501]">{exercise.squat.title}</h2>
                                    <p className="text-black text-sm">{exercise.squat.description}</p>
                                </div>
                                <div>


                                    <button className="bg-[#fb884e] hover:bg-[#F95501]  hover:text-white btn w-40 h-14  rounded-lg drop-shadow-xl" onClick={squatchange} >Start Exercise
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
