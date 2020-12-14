import React, { useContext } from 'react';
import moment from 'moment';
import userContext from '../context/userContext/userContext';
import { Link } from 'react-router-dom';

const Post = ({
    photo,
    postedBy: user,
    body,
    title,
    likes,
    comments,
    created,
}) => {
    const contextUser = useContext(userContext);
    const { auth } = contextUser;
    return (
        <div className="post">
            <div className="header">
                <Link to={`/user/${user._id}`}>
                    <div className="user">
                        <img src={user.photo} alt="user pic" />
                        <p>{user.username}</p>
                    </div>
                </Link>
                <i className="fas fa-ellipsis-h"></i>
            </div>
            <img src={photo} alt="phot" />
            {auth && (
                <div className="buttons">
                    <div className="principal">
                        <i className="far fa-heart"></i>
                        <i className="far fa-comment"></i>
                        <i className="far fa-paper-plane"></i>
                    </div>

                    <i className="far fa-bookmark"></i>
                </div>
            )}
            <p className="likes">{likes.length} Likes</p>
            <div className="post-body">
                <span>{user.username}</span> {title}
                <p>{body}</p>
            </div>
            {comments && (
                <div className="comments">
                    {comments.map((comment) => (
                        <p key={comment._id}>
                            <span>{comment.user}</span> {comment.comment}
                        </p>
                    ))}
                </div>
            )}

            <p className="posted">{moment(created).fromNow()}</p>
            {auth && (
                <div className="leave-comment">
                    <input type="text" placeholder="Leave a comment" />
                    <p className="blue-text">Post</p>
                </div>
            )}
        </div>
    );
};

export default Post;
