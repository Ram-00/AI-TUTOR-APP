import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Persist user in localStorage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (credentials) => {
        try {
            // Mock authentication
            const mockUser = {
                id: '1',
                username: credentials.username,
                type: credentials.type,
                name: 'Student Name'
            };
            
            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
            return true;
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 