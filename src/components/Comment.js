import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <Link
                to={`/user/${comment.postedBy._id}`}
            >
                {comment.postedBy.username}
            </Link>
            {comment.comment}
        </div>
    );
};

export default Comment;
