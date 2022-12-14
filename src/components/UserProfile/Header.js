import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { useUser } from '../../hooks/useUser';
import { UserContext } from '../../context/user';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import { isUserFollowingProfile } from '../../services/firebase';

import { toggleFollow } from '../../services/firebase';
import { ModalContext } from '../../context/modal';

const Header = ({
    photosCount,
    followerCount,
    setFollowerCount,
    profile: {
        docId: profileDocId,
        userId: profileUserId,
        fullName,
        followers,
        following,
        username: profileUsername
    }
}) => {
    const { openModal } = useContext(ModalContext);
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const [isFollowingProfile, setIsFollowingProfile] = useState(null);

    const handleToggleFollow = async () => {
        setIsFollowingProfile((prev) => !prev);
        setFollowerCount({
            payload: isFollowingProfile ? followerCount - 1 : followerCount + 1,
            type: 'CHANGE_FOLOWERS_COUNT'
        });
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
    };

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(!!isFollowing);
        };

        if (user?.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    }, [user?.username, profileUserId]);

    const activeBtnFollow = user && user.username !== profileUsername;

    const showList = (listIds) => {
        openModal({
            content: (
                <ul>
                    {listIds.map(id => (
                        <li key={id}>{id}</li>
                    ))}
                </ul>
            ),
        })
    }

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center items-center">
                {profileUsername ? (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                        className="rounded-full h-40 w-40 flex"
                        alt={`${fullName} profile picture`}
                        src={`/images/avatars/${profileUsername}.jpg`}
                        onError={(e) => {
                            e.target.src = DEFAULT_IMAGE_PATH;
                        }}
                    />
                ) : (
                    <p>...loading</p>
                    // <Skeleton circle height={150} width={150} count={1} />
                )}
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUsername}</p>
                    {activeBtnFollow && isFollowingProfile === null ? (
                        <p>...loading</p>
                        // <Skeleton count={1} width={80} height={32} />
                    ) : (
                        activeBtnFollow && (
                            <button
                                className="bg-blue-400 font-bold text-sm rounded text-white w-20 h-8"
                                type="button"
                                onClick={handleToggleFollow}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleToggleFollow();
                                    }
                                }}
                            >
                                {isFollowingProfile ? 'Unfollow' : 'Follow'}
                            </button>
                        )
                    )}
                </div>
                <div className="container flex mt-4">
                    {!followers || !following ? (
                        <p>...loading</p>
                        // <Skeleton count={1} width={677} height={24} />
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className="font-bold">{photosCount}</span> photos
                            </p>
                            <p
                                className="mr-10"
                                onClick={() => showList(followers)}
                            >
                                <span className="font-bold">{followerCount}</span>
                                {` `}
                                {followerCount === 1 ? `follower` : `followers`}
                            </p>
                            <p
                                className="mr-10"
                                onClick={() => showList(following)}>
                                <span className="font-bold">{following?.length}</span> following
                            </p>
                        </>
                    )}
                </div>
                <div className="container mt-4">
                    <p className="font-medium">{!fullName
                        ? "...loading"
                        // <Skeleton count={1} height={24} />
                        : fullName
                    }</p>
                </div>
            </div>
        </div >
    );
}

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array
    }).isRequired
};

export default Header;