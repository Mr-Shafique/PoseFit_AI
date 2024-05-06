// src/contexts/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [squatData, setSquatData] = useState(null);
  const [plankData, setPlankData] = useState(null);
  const { authToken } = useAuth(); // Get the auth token from the AuthContext

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authToken) return; // If no token, do not proceed

        // Fetch user profile data
        const userProfileResponse = await axios.get('http://127.0.0.1:5000/user/profile', {
          headers: {
            Authorization: `Bearer ${authToken}` // Add JWT token to the request headers
          }
        });

        setUser(userProfileResponse.data); // Set user data in the context

        // Fetch squat data
        const squatResponse = await axios.get('http://127.0.0.1:5000/squat/get', {
          headers: {
            Authorization: `Bearer ${authToken}` // Add JWT token to the request headers
          }
        });

        setSquatData(squatResponse.data); // Set squat data in the context

        // Fetch plank data
        const plankResponse = await axios.get('http://127.0.0.1:5000/plank/get', {
          headers: {
            Authorization: `Bearer ${authToken}` // Add JWT token to the request headers
          }
        });

        setPlankData(plankResponse.data); // Set plank data in the context
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();

    return () => {
      setUser(null); // Clear user data when unmounting
      setSquatData(null); // Clear squat data when unmounting
      setPlankData(null); // Clear plank data when unmounting
    };
  }, [authToken]); // Re-run effect when authToken changes

  return (
    <UserContext.Provider value={{ user, squatData, plankData }}>
      {children}
    </UserContext.Provider>
  );
};
