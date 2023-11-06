import { createContext, useState } from 'react';

export const FirebaseContext = createContext(null);

const AuthContext = createContext(null);

export default function Context({ children }) {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
}