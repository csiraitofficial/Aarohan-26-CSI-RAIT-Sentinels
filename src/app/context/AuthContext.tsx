import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('sentinel_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('sentinel_users') || '[]');
      if (existingUsers.some((u: any) => u.email === email)) {
        throw new Error('User already exists');
      }

      // Store user credentials (in production, this would be hashed on backend)
      const newUser = { name, email, password };
      existingUsers.push(newUser);
      localStorage.setItem('sentinel_users', JSON.stringify(existingUsers));

      // Set current user
      const userData = { name, email };
      setUser(userData);
      localStorage.setItem('sentinel_user', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate credentials
      const existingUsers = JSON.parse(localStorage.getItem('sentinel_users') || '[]');
      const user = existingUsers.find((u: any) => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Set current user
      const userData = { name: user.name, email: user.email };
      setUser(userData);
      localStorage.setItem('sentinel_user', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sentinel_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
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
