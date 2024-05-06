import { useState } from "react"
import { useEffect } from "react"
import { useUserContext } from "../UserContext"


export default function History() {
    const { squatData, plankData } = useUserContext();

    const [squatCorrect, setSquatCorrect] = useState('0');
    const [squatIncorrect, setSquatIncorrect] = useState('0');
    const [plankCorrect, setPlankCorrect] = useState('0');
    const [plankIncorrect, setPlankIncorrect] = useState('0');

    useEffect(() => {
        if(squatData) {
            setSquatCorrect(squatData.correct || '0');
            setSquatIncorrect(squatData.incorrect || '0');
        }
        if(plankData) {
            setPlankCorrect(plankData.correct || '0');
            setPlankIncorrect(plankData.incorrect || '0');
        }
      }, [squatData, plankData]);

    


    return (
        <>
            <div className="flex justify-center">

                <div className="  flex flex-col container  gap-4 p-4 ">
                    <div className="">

                        <h1 className="text-5xl font-semibold text-[#F95501]">History</h1>
                        <small>"Exercise not only
                            changes your body,
                            it changes your
                            mind, your attitude
                            and your mood."</small>
                    </div>
                    <div className="collapse p-4 collapse-arrow bg-base-200 mb-48 ">
                        <input type="radio" name="my-accordion-2"  />
                        <div className="collapse-title text-xl font-semibold">
                        Squat Exercise
                        </div>
                        <div className="collapse-content flex flex-col   justify-between  sm:flex-row  gap-2 ">
                            <div className=" flex justify-between p-2 px-4 w-full bg-green-400 h-10 rounded-lg text-white font-medium  sm:w-[30%]">
                                <p>Correct </p>
                                <p>{squatCorrect}</p>
                            </div>
                            <div className=" w-full  bg-[#f95501] h-10 rounded-lg flex justify-between p-2 px-4 text-white font-medium  sm:w-[30%]">
                                <p>Incorrect</p>
                                <p>{squatIncorrect}</p>
                            </div>
                        </div>
                    </div>

                    <div className="collapse p-4 collapse-arrow bg-base-200 mb-48 ">
                        <input type="radio" name="my-accordion-2"  />
                        <div className="collapse-title text-xl font-semibold">
                        Plank Exercise
                        </div>
                        <div className="collapse-content flex flex-col   justify-between  sm:flex-row  gap-2 ">
                            <div className=" flex justify-between p-2 px-4 w-full bg-green-400 h-10 rounded-lg text-white font-medium  sm:w-[30%]">
                                <p>Correct </p>
                                <p>{plankCorrect}</p>
                            </div>
                            <div className=" w-full  bg-[#f95501] h-10 rounded-lg flex justify-between p-2 px-4 text-white font-medium  sm:w-[30%]">
                                <p>Incorrect</p>
                                <p>{plankIncorrect}</p>
                            </div>
                        </div>
                    </div>




                    


                </div>
            </div>
            
        </>
    )
}