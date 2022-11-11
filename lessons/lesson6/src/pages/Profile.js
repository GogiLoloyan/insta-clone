import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../components/Header';
import UserProfile from '../components/UserProfile';
import { getUserBy } from '../services/firebase';
import * as ROUTES from '../constants/routes';

export default function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkUserExists() {
            const [user] = await getUserBy('username', username);
            if (user?.userId) {
                setUser(user);
            } else {
                navigate(ROUTES.NOT_FOUND);
            }
        }

        checkUserExists();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    // --- if no user yet then show loading
    if (!user?.username) {
        return <p>...loding</p>
    }

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    )
}