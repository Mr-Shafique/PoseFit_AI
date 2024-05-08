import axiosInstance from './axiosConfig';

export const startSession = async (exerciseName) => {
  try {
    const response = await axiosInstance.post('/session/start', { exercise_name: exerciseName });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Failed to start session');
    } else {
      throw new Error('Failed to start session');
    }
  }
};

export const updateSession = async ({ correct, incorrect, feedback }) => {
  try {
    const response = await axiosInstance.post('/session/update', { correct, incorrect, feedback });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Failed to update session');
    } else {
      throw new Error('Failed to update session');
    }
  }
};

export const endSession = async ({ correct, incorrect, feedback }) => {
  try {
    const response = await axiosInstance.post('/session/end', { correct, incorrect, feedback });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Failed to end session');
    } else {
      throw new Error('Failed to end session');
    }
  }
};
