import React from 'react';

// Sample data for demonstration purposes
const sessions = [
  { exercise: 'Plank', startTime: '10:00', endTime: '10:05', correct: '5 minutes', incorrect: 'N/A' },
  { exercise: 'Squat', startTime: '10:10', endTime: '10:15', correct: '20', incorrect: '5' },
  { exercise: 'Squat', startTime: '10:20', endTime: '10:30', correct: '19', incorrect: '4' },
  { exercise: 'Squat', startTime: '10:37', endTime: '10:42', correct: '24', incorrect: '5' },
  { exercise: 'Plank', startTime: '10:48', endTime: '10:55', correct: '7 minutes', incorrect: 'N/A' },
  { exercise: 'Plank', startTime: '11:01', endTime: '11:06', correct: '5 minutes', incorrect: 'N/A' },
  { exercise: 'Squat', startTime: '11:12', endTime: '11:18', correct: '24', incorrect: '2' },
  { exercise: 'Squat', startTime: '11:26', endTime: '11:33', correct: '20', incorrect: '4' },
  { exercise: 'Squat', startTime: '11:42', endTime: '11:47', correct: '22', incorrect: '4' },
  { exercise: 'Squat', startTime: '11:53', endTime: '12:00', correct: '22', incorrect: '5' }
];

const SessionHistoryTable = () => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg  ">
      <h2 className="text-2xl font-semibold text-black text-center ">Session History</h2>
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-[#F95501] text-white">
          <tr>
            <th scope="col" className="py-3 px-6">
              Exercise
            </th>
            <th scope="col" className="py-3 px-6">
              Start Time
            </th>
            <th scope="col" className="py-3 px-6">
              End Time
            </th>
            <th scope="col" className="py-3 px-6">
              Correct
            </th>
            <th scope="col" className="py-3 px-6">
              Incorrect
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {sessions.map((session, index) => (
            <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="py-4 px-6 text-gray-900 dark:text-white">
                {session.exercise}
              </td>
              <td className="py-4 px-6 text-gray-900 dark:text-white">
                {session.startTime}
              </td>
              <td className="py-4 px-6 text-gray-900 dark:text-white">
                {session.endTime}
              </td>
              <td className="py-4 px-6 text-gray-900 dark:text-white">
                {session.correct}
              </td>
              <td className="py-4 px-6 text-gray-900 dark:text-white">
                {session.incorrect}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionHistoryTable;