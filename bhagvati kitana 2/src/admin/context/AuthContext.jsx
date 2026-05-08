import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Custom navigation hook might not work if AuthProvider wraps BrowserRouter.
  // Wait, AuthProvider is inside BrowserRouter, but we don't have navigate yet.
  // We'll pass navigate from components or use it safely.
  
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (username, password, navigateCallback) => {
    try {
      const response = await api.post('token/', { username, password });
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      setUser({ token: access });
      if(navigateCallback) navigateCallback('/admin');
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const logout = (navigateCallback) => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    if(navigateCallback) navigateCallback('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
