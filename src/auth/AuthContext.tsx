import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebaseConfig';

interface AuthContextType {
    user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Properly pass a function to match the expected type
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser); // Update user state
        });

        return () => unsubscribe(); // Cleanup subscription
    }, []);

    // Wrap the context value in useMemo to avoid unnecessary re-renders
    const value = useMemo(() => ({ user }), [user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
