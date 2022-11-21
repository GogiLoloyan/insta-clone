import { useState, useEffect } from 'react';
import { getUserBy } from '../services/firebase';

export const useUser = (userId) => {
    const [activeUser, setActiveUser] = useState();

    useEffect(() => {
        async function getUserObjByUserId(userId) {
            const [user] = await getUserBy("userId", userId);
            setActiveUser(user || {});
        }

        if (userId) {
            getUserObjByUserId(userId);
        }
    }, [userId]);

    return { user: activeUser, setActiveUser };
}

