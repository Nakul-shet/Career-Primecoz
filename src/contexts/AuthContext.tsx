import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAdminLoggedIn: boolean;
  isMemberLoggedIn: boolean;
  adminLogin: (username: string, password: string) => boolean;
  memberLogin: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isMemberLoggedIn, setIsMemberLoggedIn] = useState(false);

  const adminLogin = (username: string, password: string) => {
    // Dummy authentication
    if (username === 'admin' && password === 'password') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const memberLogin = (email: string, password: string) => {
    // Dummy authentication
    if (email.includes('@') && password.length >= 6) {
      setIsMemberLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    setIsMemberLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      isAdminLoggedIn,
      isMemberLoggedIn,
      adminLogin,
      memberLogin,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};