import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
    import { auth } from '../firebase';
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser, updateProfile as firebaseUpdateProfile } from 'firebase/auth';

    interface User {
      id: string;
      email: string;
      name: string;
      phone?: string;
      address?: string;
      sellingBooks?: any[];
      purchasedBooks?: any[];
    }

    interface AuthContextType {
      user: User | null;
      login: (email: string, password: string) => Promise<boolean>;
      register: (email: string, password: string, name: string) => Promise<boolean>;
      logout: () => Promise<void>;
      updateProfile: (data: Partial<User>) => Promise<void>;
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export function AuthProvider({ children }: { children: ReactNode }) {
      const [user, setUser] = useState<User | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || 'User',
              phone: firebaseUser.phoneNumber || undefined,
              sellingBooks: [],
              purchasedBooks: []
            });
          } else {
            setUser(null);
          }
          setLoading(false);
        });

        return () => unsubscribe();
      }, []);

      const login = async (email: string, password: string) => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          return true;
        } catch (error) {
          console.error("Login failed:", error);
          return false;
        }
      };

      const register = async (email: string, password: string, name: string) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await firebaseUpdateProfile(userCredential.user, { displayName: name });
          return true;
        } catch (error) {
          console.error("Registration failed:", error);
          return false;
        }
      };

      const logout = async () => {
        try {
          await signOut(auth);
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };

      const updateProfile = async (data: Partial<User>) => {
        if (auth.currentUser) {
          try {
            if (data.name) {
              await firebaseUpdateProfile(auth.currentUser, {
                displayName: data.name,
              });
            }
            setUser((prevUser) => {
              if (prevUser) {
                return { ...prevUser, ...data };
              }
              return prevUser;
            });
          } catch (error) {
            console.error("Failed to update profile:", error);
          }
        }
      };

      if (loading) {
        return <div>Loading...</div>;
      }

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
