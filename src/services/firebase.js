import { db } from '../lib/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore'


export async function getUserBy(key, value) {
    const q = query(
        collection(db, "users"),
        where(key, "==", value));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id
    }));
}

export async function getUserPhotosByUserId(userId) {
    const q = query(
        collection(db, "photos"),
        where('userId', "==", userId));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));;
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const q = query(
        collection(db, "users"),
        where('username', "==", loggedInUserUsername),
        where('following', "array-contains", profileUserId),
    );

    const querySnapshot = await getDocs(q);

    const [response = {}] = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return response.userId;
}