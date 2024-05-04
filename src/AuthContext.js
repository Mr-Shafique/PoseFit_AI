// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/login', {
                username,
                password
            });
            const { access, refresh } = response.data.tokens;
            localStorage.setItem('token', access);  // Save the access token to local storage
            setAuthToken(access);
            return true;
        } catch (error) {
            console.error('Login failed:', error.response || error.message);
            throw error;
            
            return false;
        }
    };

    const logout = async () => {
      if (authToken) {
          try {
              const response = await axios.get('http://127.0.0.1:5000/auth/logout', {
                  headers: {
                      'Authorization': `Bearer ${authToken}`
                  }
              });
              localStorage.removeItem('token');
              setAuthToken(null);
              console.log('Logout successful');
          } catch (error) {
              console.error('Logout failed:', error);
              // Optionally handle logout error
          }
      } else {
          console.log('No auth token present');
      }
  };
  

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
