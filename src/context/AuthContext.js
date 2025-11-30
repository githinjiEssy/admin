import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('adminUser');
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback((adminData, token) => {
    setAdmin(adminData);
    setError(null);
    localStorage.setItem('authToken', token);
    localStorage.setItem('adminUser', JSON.stringify(adminData));
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminUser');
  }, []);

  const isAuthenticated = !!admin;

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        setLoading,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
