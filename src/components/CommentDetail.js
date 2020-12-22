import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../context/userContext/userContext';

const CommentDetail = ({ comment }) => {
    const { auth, user } = useContext(userContext);
    return (
        <div className="comment-detail-item">
            <div className="left">
                <img src={comment.postedBy.photo} alt={comment} />
                <p>
                    <Link to={`/user/${comment.postedBy._id}`}>
                        {comment.postedBy.username}
                    </Link>
                    {comment.comment}
                </p>
            </div>
            <div className="right">
                {auth
                    ? comment.postedBy._id === user._id && (
                          <>
                              <i className="far red-text fa-trash-alt"></i>
                              <i className="far fa-edit"></i>
                          </>
                      )
                    : null}
                {/* TODO: add the functionality */}
            </div>
        </div>
    );
};

export default CommentDetail;
