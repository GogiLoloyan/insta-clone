import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));

    useEffect(() => {
        const auth = getAuth();
        const listener = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                // we have a user...therefore we can store the user in localstorage
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                // we don't have an authUser, therefore clear the localstorage
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => listener();
    }, []);

    return { user };
}