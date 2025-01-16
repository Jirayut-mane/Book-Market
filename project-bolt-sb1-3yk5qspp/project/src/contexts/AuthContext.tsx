import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Simulated user database
  const adminUser = {
    id: '1',
    email: 'admin123',
    password: 'admin123',
    name: 'แอดมิน',
    phone: '081-234-5678',
    address: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110'
  };

  const login = (email: string, password: string) => {
    if (email === adminUser.email && password === adminUser.password) {
      setUser({
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        phone: adminUser.phone,
        address: adminUser.address
      });
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, name: string) => {
    if (email === adminUser.email) {
      return false;
    }
    setUser({ id: Date.now().toString(), email, name });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}