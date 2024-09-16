// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string, email: string, fullName: string) => Promise<void>;
  logout: () => void;
}

// Define a User type
interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  token: string; // For simplicity, using a token string
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    // TODO: Replace with real API call
    // Mock authentication
    if (username === 'test' && password === 'password') {
      const mockUser: User = {
        id: '1',
        username: 'test',
        email: 'test@example.com',
        fullName: 'Test User',
        token: 'fake-jwt-token',
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  // Signup function
  const signup = async (username: string, password: string, email: string, fullName: string) => {
    // TODO: Replace with real API call
    // Mock signup process
    const newUser: User = {
      id: '2',
      username,
      email,
      fullName,
      token: 'fake-jwt-token',
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
