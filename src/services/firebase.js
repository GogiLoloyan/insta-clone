import { db } from '../lib/firebase';
import { getDocs, collection, query, where, doc, setDoc, arrayUnion, arrayRemove, limit } from 'firebase/firestore'


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

export async function toggleFollow(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId
) {
    // 1st param: karl's doc id
    // 2nd param: raphael's user id
    // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);

    // 1st param: karl's user id
    // 2nd param: raphael's doc id
    // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // currently logged in user document id (karl's profile)
    profileId, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {

    const docRef = doc(db, "users", loggedInUserDocId);

    const data = {
        following: isFollowingProfile ?
            arrayRemove(profileId) :
            arrayUnion(profileId)
    };

    return await setDoc(docRef, data, { merge: true })

    // return firebase
    //     .firestore()
    //     .collection('users')
    //     .doc(loggedInUserDocId)
    //     .update({
    //         following: isFollowingProfile ?
    //             FieldValue.arrayRemove(profileId) :
    //             FieldValue.arrayUnion(profileId)
    //     });
}

export async function updateFollowedUserFollowers(
    profileDocId, // currently logged in user document id (karl's profile)
    loggedInUserDocId, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {

    const docRef = doc(db, "users", profileDocId);

    const data = {
        followers: isFollowingProfile ?
            arrayRemove(loggedInUserDocId) :
            arrayUnion(loggedInUserDocId)
    };

    return await setDoc(docRef, data, { merge: true })


    // const q = query(
    //     collection(db, "users"),
    //     where('username', "==", loggedInUserUsername),
    //     where('following', "array-contains", profileUserId),
    // );

    // const querySnapshot = await getDocs(q);
    // return firebase
    //     .firestore()
    //     .collection('users')
    //     .doc(profileDocId)
    //     .update({
    //         followers: isFollowingProfile ?
    //             FieldValue.arrayRemove(loggedInUserDocId) :
    //             FieldValue.arrayUnion(loggedInUserDocId)
    //     });
}

export async function getSuggestedProfiles(userId, following) {

    const q = query(
        collection(db, "users"),
        where('userId', 'not-in', [...following ?? [], userId]),
        limit(10)
    );

    const querySnapshot = await getDocs(q);

    const profiles = querySnapshot.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    }));

    return profiles;
}