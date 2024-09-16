import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { auth } from '../../firebaseConfig'; // Firebase auth instance

// Define the shape of the AuthContext
interface AuthContextType {
  user: FirebaseUser | null;
  logout: () => Promise<void>;
}

// Create a context for the auth user
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to access the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// AuthProvider component to wrap around the app and manage auth state
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase listener for authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Once auth state is determined, stop loading
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      setUser(null); // Clear the user state after signing out
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    // You can return a loading state (spinner, etc.) while waiting for auth state
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
