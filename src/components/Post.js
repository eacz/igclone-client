import React, { useContext, useState } from 'react';
import moment from 'moment';
import userContext from '../context/userContext/userContext';
import { Link, useHistory } from 'react-router-dom';
import axiosClient from '../config/config';
import postContext from '../context/postsContext/postContext';

const Post = ({
    photo,
    postedBy: user,
    body,
    title,
    likes,
    comments,
    created,
    _id,
}) => {
    const history = useHistory();
    const [pLikes, setPLikes] = useState(likes);
    const contextUser = useContext(userContext);
    const { auth, updateListUser, user: loggedUser } = contextUser;
    const { updateLikes } = useContext(postContext);
    const redirectToUserDetails = (users) => {
        if (!auth) return;
        if (users.length === 0) return;
        updateListUser(users);
        history.push(`/userlist`);
    };

    const handleLikeDislike = async () => {
        if(!auth)return;
        try {
            await axiosClient.post(`/post/like/${_id}`);
            pLikes.includes(loggedUser._id)
                ? setPLikes(
                      likes.filter((id) =>
                          id.toString() === loggedUser._id.toString()
                              ? null
                              : id
                      )
                  )
                : setPLikes([...pLikes, loggedUser._id]);
            updateLikes(_id, loggedUser._id);
        } catch (error) {
            console.log(error);
        }
    };
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
                        <i
                            className={`${
                                pLikes.includes(loggedUser._id)
                                    ? 'fas red-text'
                                    : 'far'
                            } fa-heart`}
                            onClick={() => handleLikeDislike()}
                        ></i>
                        <i className="far fa-comment"></i>
                        <i className="far fa-paper-plane"></i>
                    </div>

                    <i className="far fa-bookmark"></i>
                </div>
            )}
            <p
                className={`likes ${pLikes.length > 0 ? 'pointer' : ''}`}
                onClick={() => redirectToUserDetails(pLikes)}
            >
                {pLikes.length} Likes
            </p>
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
