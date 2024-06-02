import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const SessionHistoryTable = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/session/all');

        // Log the raw response data
        console.log('Raw API response:', response.data);

        // Process the fetched data to match your table structure
        const processedData = response.data.map(session => {
          if (!session) return null;

          const startTime = session.start_time ? new Date(session.start_time) : null;
          const endTime = session.end_time ? new Date(session.end_time) : null;
          let correct = session.correct ?? 'N/A';
          let incorrect = session.incorrect ?? 'N/A';

          // Add seconds unit for "plank" exercises if exercise_name is not null
          if (session.exercise_name && session.exercise_name.toLowerCase() === 'plank') {
            correct = `${session.correct ?? 0} seconds`;
            incorrect = `${session.incorrect ?? 0} seconds`;
          }

          const duration = session.duration !== null ? `${(session.duration / 60).toFixed(2)} minutes` : 'N/A';

          return {
            exercise: session.exercise_name ?? 'N/A',
            startTime,
            endTime,
            duration,
            correct,
            incorrect,
          };
        }).filter(session => session !== null); // Remove null entries

        // Log the processed data
        console.log('Processed data:', processedData);

        // Sort sessions by start time in descending order
        processedData.sort((a, b) => b.startTime - a.startTime);

        setSessions(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <h2 className="text-2xl font-semibold text-black text-center">Session History</h2>
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-[#F95501] text-white">
          <tr>
            <th scope="col" className="py-3 px-6">Exercise</th>
            <th scope="col" className="py-3 px-6">Start Time</th>
            <th scope="col" className="py-3 px-6">End Time</th>
            <th scope="col" className="py-3 px-6">Duration</th>
            <th scope="col" className="py-3 px-6">Correct</th>
            <th scope="col" className="py-3 px-6">Incorrect</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {sessions.map((session, index) => (
            <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="py-4 px-6 text-gray-900 dark:text-white">{session.exercise}</td>
              <td className="py-4 px-6 text-gray-900 dark:text-white">
                {session.startTime ? session.startTime.toLocaleTimeString() : 'N/A'}
              </td>
              <td className="py-4 px-6 text-gray-900 dark:text-white">
                {session.endTime ? session.endTime.toLocaleTimeString() : 'N/A'}
              </td>
              <td className="py-4 px-6 text-gray-900 dark:text-white">{session.duration}</td>
              <td className="py-4 px-6 text-gray-900 dark:text-white">{session.correct}</td>
              <td className="py-4 px-6 text-gray-900 dark:text-white">{session.incorrect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionHistoryTable;
