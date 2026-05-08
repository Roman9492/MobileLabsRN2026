import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, resetPassword, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);