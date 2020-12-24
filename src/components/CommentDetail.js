import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import postContext from '../context/postsContext/postContext';
import userContext from '../context/userContext/userContext';

const CommentDetail = ({ comment, setComments }) => {
    const { auth, user } = useContext(userContext);
    const {deleteComment} = useContext(postContext)
    const handleDeleteComment = async () => {
        if(user._id !== comment.postedBy._id) return;
        deleteComment(comment)
        setComments(comments => comments.filter(pComment => pComment._id === comment._id ? null : pComment))
    }
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
                              <i onClick={() => handleDeleteComment()} className="far red-text fa-trash-alt"></i>
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
