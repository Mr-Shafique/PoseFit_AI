import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();

    // Helper function to refresh the token
    const refreshToken = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/refresh', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
                }
            });
            const { access } = response.data;
            localStorage.setItem('token', access);
            setAuthToken(access);
            return access;
        } catch (error) {
            console.error('Refresh token failed:', error.response || error.message);
            logout();
            return null;
        }
    };

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                if (error.response && error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const newToken = await refreshToken();
                    if (newToken) {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                        return axios(originalRequest);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/login', {
                username,
                password
            });
            const { access, refresh } = response.data.tokens;
            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);
            setAuthToken(access);
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
        navigate('/login'); // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
