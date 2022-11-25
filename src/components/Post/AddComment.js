import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { arrayUnion, doc, setDoc } from 'firebase/firestore';

import { UserContext } from '../../context/user';
import { db } from '../../lib/firebase';

export default function AddComment({ docId, comments, setComments, commentInput }) {
    const [comment, setComment] = useState('');
    const {
        user: { displayName }
    } = useContext(UserContext);

    const handleSubmitComment = (event) => {
        event.preventDefault();

        setComments([...comments, { displayName, comment }]);
        setComment('');

        // return firebase
        //     .firestore()
        //     .collection('photos')
        //     .doc(docId)
        //     .update({
        //         comments: FieldValue.arrayUnion({ displayName, comment })
        //     });

        const data = {
            comments: arrayUnion({ displayName, comment })
        }
        const docRef = doc(db, "photos", docId);
        setDoc(docRef, data, { merge: true })
    };

    return (
        <div className="border-t border-gray-primary">
            <form
                className="flex justify-between pl-0 pr-5"
                method="POST"
                onSubmit={(event) =>
                    comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
                }
            >
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <button
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    );
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object
};