import { useRef } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Actions from './Actions';
import Footer from './Footer';
import Comments from './Comments';

export default function Post({ content }) {
    const commentInputRef = useRef(null);
    const handleFocus = () => commentInputRef.current.focus();

    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
            <Header username={content.username} />
            <img src={content.imageSrc} alt={content.caption} />
            <Actions
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus}
            />
            <Footer caption={content.caption} username={content.username} />
            <Comments
                docId={content.docId}
                comments={content.comments}
                posted={content.dateCreated}
                commentInputRef={commentInputRef}
            />
        </div>
    );
}

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    })
};