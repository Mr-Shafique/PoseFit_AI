import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate(); // useNavigate hook for redirection

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                console.log("Interceptor caught an error", error.response);
                if (error.response && error.response.status === 401) {
                    console.log("Detected 401 error, logging out...");
                    logout(); // Logs out if token cannot be refreshed or is invalid
                }
                return Promise.reject(error);
            }
        );
    
        return () => {
            axios.interceptors.response.eject(interceptor);
            console.log("Interceptor removed");
        };
    }, []); // Ensures this setup runs only once
    

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/login', {
                username,
                password
            });
            const { access, refresh } = response.data.tokens;
            localStorage.setItem('token', access);
            setAuthToken(access);
            return true;
        } catch (error) {
            console.error('Login failed:', error.response || error.message);
            return false;
        }
    };

    const logout = () => {
        console.log("Executing logout...");
        localStorage.removeItem('token');
        setAuthToken(null);
        navigate('/'); // Make sure this path is correct and corresponds to your login route
    };
    

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
