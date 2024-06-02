import React from 'react';
import Feedback from './Feedback';
import SessionHistoryTable from './SessionHistoryTable';
import { useState, useEffect } from 'react';
import Nav from './Nav';
import { useUserContext } from '../UserContext';

const FEEDBACK_ID_MAP_SQUAT = {
    0: { text: 'BEND BACKWARDS' },
    1: { text: 'BEND FORWARD' },
    2: { text: 'KNEE FALLING OVER TOE' },
    3: { text: 'SQUAT TOO DEEP' },
  };

  const FEEDBACK_ID_MAP_PLANK = {
    0: { text: 'LOWER YOUR HEAD' },
    1: { text: 'RAISE YOUR HEAD' },
    2: { text: 'LOWER YOUR HIPS' },
    3: { text: 'RAISE YOUR HIPS' },
    4: { text: 'KEEP FEET VERTICAL' },
    5: { text: 'KEEP SHOULDERS VERTICAL' }
};

  
  const feedbackFrequencySquat = {
    0: 5,
    1: 3,
    2: 7,
    3: 2,
  };

  const feedbackFrequencyPlank = {
    0: 4, 
    1: 2, 
    2: 5, 
    3: 3, 
    4: 6, 
    5: 1  
};

  
  const title = "Squat Exercise Feedback";

export default function Profile() {

    const { user, squatData, plankData } = useUserContext();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    const [squatCorrect, setSquatCorrect] = useState('0');
    const [squatIncorrect, setSquatIncorrect] = useState('0');
    const [squatFeedback, setSquatFeedback] = useState([feedbackFrequencySquat]);
    const [plankCorrect, setPlankCorrect] = useState('0');
    const [plankIncorrect, setPlankIncorrect] = useState('0');
    const [plankFeedback, setPlankFeedback] = useState([feedbackFrequencyPlank]);

    useEffect(() => {
        if (user) {
          setUsername(user.username || 'John Doe');
          setEmail(user.email || 'john@gmail.com');
          setAge(user.age || '25');
          setHeight(user.height || '5.5');
          setWeight(user.weight || '65');
        }
        if(squatData) {
            setSquatCorrect(squatData.correct || '0');
            setSquatIncorrect(squatData.incorrect || '0');
            if(squatData.feedback) {
                setSquatFeedback(squatData.feedback);
            }
        }
        if(plankData) {
            setPlankCorrect(plankData.correct || '0');
            setPlankIncorrect(plankData.incorrect || '0');
            if(plankData.feedback) {
                setPlankFeedback(plankData.feedback);
            }
        }
      }, [user, squatData, plankData]);


    return (
        <>
        <Nav />
        <div className='flex justify-center m-0'>

            <div className='flex flex-col p-4 container '>

                <div className='flex flex-col '>

                <div className='flex flex-col md:flex-row mb-20'>
    <div className='w-full md:w-4/12 flex justify-center items-center'>
        <img src="./images/Rectangle 5933.png" alt="Profile" className='rounded-lg shadow-xl' style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
    <div className='w-full md:w-8/12 flex flex-col gap-4 p-4'>
        <div className='bg-gray-200 rounded-lg flex items-center h-16 shadow p-3'>
            <span className="font-semibold text-lg text-gray-800 mx-auto">{username}</span>
        </div>
        <div className='bg-gray-200 rounded-lg flex items-center h-16 shadow p-3'>
            <span className="font-semibold text-lg text-gray-800 mx-auto">{email}</span>
        </div>
        <div className='bg-gray-200 rounded-lg flex items-center h-16 shadow p-3'>
            <span className="font-semibold text-lg text-gray-800 mx-auto">{age} Years</span>
        </div>
        <div className='bg-gray-200 rounded-lg flex items-center h-16 shadow p-3'>
            <span className="font-semibold text-lg text-gray-800 mx-auto">{height} CM</span>
        </div>
        <div className='bg-gray-200 rounded-lg flex items-center h-16 shadow p-3'>
            <span className="font-semibold text-lg text-gray-800 mx-auto">{weight} KG</span>
        </div>
    </div>
</div>

                    <div className="collapse p-4 collapse-arrow bg-base-200 mb-4" >
                       <div className='text-xl font-semibold p-4'>
                        Squat exercise
                       </div>
                        <div className=" flex flex-col   justify-between  sm:flex-row  gap-2 ">
                            <div className=" flex justify-between p-2 px-4 w-full bg-green-400 h-10 rounded-lg text-white font-medium  sm:w-[30%]">
                                <p>Correct</p>
                                <p>{squatCorrect}</p>
                            </div>
                            <div className=" w-full  bg-[#f95501] h-10 rounded-lg flex justify-between p-2 px-4 text-white font-medium  sm:w-[30%]">
                                <p>Incorrect</p>
                                <p>{squatIncorrect}</p>
                            </div>
                        </div>
                    </div>
                    <div className="collapse p-4 collapse-arrow bg-base-200 mb-4 ">
                       <div className='text-xl font-semibold p-4'>
                        Plank exercise
                       </div>
                        <div className=" flex flex-col   justify-between  sm:flex-row  gap-2 ">
                            <div className=" flex justify-between p-2 px-4 w-full bg-green-400 h-10 rounded-lg text-white font-medium  sm:w-[30%]">
                                <p>Correct</p>
                                <p>{plankCorrect} seconds</p>
                            </div>
                            <div className=" w-full  bg-[#f95501] h-10 rounded-lg flex justify-between p-2 px-4 text-white font-medium  sm:w-[30%]">
                                <p>Incorrect</p>
                                <p>{plankIncorrect} seconds</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-4  border-none rounded-lg overflow-scroll'>
                    <Feedback feedbackIdMap={FEEDBACK_ID_MAP_SQUAT} feedbackFrequency={squatFeedback} title={"Squat Exercise Feedback"} />
                    <Feedback feedbackIdMap={FEEDBACK_ID_MAP_PLANK} feedbackFrequency={plankFeedback} title={"Plank Exercise Feedback"} />
                    </div>
                </div>
                <SessionHistoryTable />
            </div>
        </div>
        </>
    );
}


