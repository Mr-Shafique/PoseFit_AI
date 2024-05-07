import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './axiosConfig'; // Import the custom axios instance
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', { username, password });
            const { access, refresh } = response.data.tokens;
            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);
            setAuthToken(access);
            setRefreshToken(refresh);
            return true;
        } catch (error) {
            console.error('Login failed:', error.response || error.message);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setAuthToken(null);
        setRefreshToken(null);        
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ authToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
