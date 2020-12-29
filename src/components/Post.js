import React, { useContext, useRef, useState } from 'react';
import moment from 'moment';
import userContext from '../context/userContext/userContext';
import { Link, useHistory } from 'react-router-dom';
import axiosClient from '../config/config';
import postContext from '../context/postsContext/postContext';
import Comments from './Comments';
import LeaveComment from './LeaveComment';
import Modal from './Layout/Modal';
import { copyToClipboard } from '../shared/helpers';

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
    const commentInput = useRef(null);
    const [pLikes, setPLikes] = useState(likes);
    const [showShare, setShowShare] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const contextUser = useContext(userContext);
    const { auth, updateListUser, user: loggedUser, updateUser } = contextUser;
    const { updateLikes,refetchPosts } = useContext(postContext);
    const [pComments, setPComments] = useState(comments);
    const redirectToUserDetails = (users) => {
        if (!auth) return;
        if (users.length === 0) return;
        updateListUser(users);
        history.push(`/userlist`);
    };

    const handleLikeDislike = async () => {
        if (!auth) return;
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

    const handleFocusInput = () => {
        commentInput.current.focus();
    };

    const handleDeletePost = async () => {
        try {
            await axiosClient.delete(`/post/${_id}`);
            history.push('/profile');
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnfollow = async () => {
        const data = { userID: user._id, follow: false };
        try {
            const res = await axiosClient.post('/user/follow', data);
            updateUser(res.data.user);
            refetchPosts();
            setShowOptions(false)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="post">
                <div className="header">
                    <Link to={`/user/${user._id}`}>
                        <div className="user">
                            <img src={user.photo} alt="user pic" />
                            <p>{user.username}</p>
                        </div>
                    </Link>
                    <i
                        className="fas fa-ellipsis-h"
                        onClick={() => setShowOptions(true)}
                    ></i>
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
                            <i
                                className="far fa-comment"
                                onClick={handleFocusInput}
                            ></i>
                            <i
                                className="far fa-paper-plane"
                                onClick={() => setShowShare(true)}
                            ></i>
                        </div>

                        <i className="far fa-bookmark"></i>
                    </div>
                )}
                <p
                    className={`likes ${pLikes.length > 0 && auth ? 'pointer' : ''}`}
                    onClick={() => redirectToUserDetails(pLikes)}
                >
                    {pLikes.length} Likes
                </p>
                <div className="post-body">
                    <Link to={`/user/${user._id}`}>
                        <span>{user.username}</span>
                    </Link>{' '}
                    {title}
                    <p>{body}</p>
                </div>
                {pComments.length > 0 && (
                    <Comments comments={pComments} post={_id} />
                )}

                <p className="posted">{moment(created).fromNow()}</p>
                {auth && (
                    <LeaveComment
                        inputRef={commentInput}
                        postID={_id}
                        setPComments={setPComments}
                    />
                )}
            </div>

            <Modal
                showModal={showShare}
                setShowModal={setShowShare}
                title="Share this post!"
                additionalClasses="modal-body-share"
            >
                <input
                    onClick={() => copyToClipboard()}
                    id="link-to-share"
                    type="text"
                    value={`https://igclone-client.vercel.app/post/${_id}`}
                    readOnly
                />

                <i
                    className="far fa-clipboard"
                    onClick={() => copyToClipboard()}
                ></i>
            </Modal>

            <Modal
                showModal={showOptions}
                setShowModal={setShowOptions}
                title="Options"
            >
                {auth && user._id === loggedUser._id ? (
                    <p
                        className="red-text pointer"
                        onClick={() => handleDeletePost()}
                    >
                        Delete Post
                    </p>
                ) : loggedUser?.following.includes(user._id) ? (
                    <p className="red-text pointer" onClick={() => handleUnfollow()}>Unfollow</p>
                ) : null}

                <Link className="black-text" to={`/post/${_id}`}>
                    Go to the post
                </Link>
                <p><Link className="black-text" to={`/user/${user._id}`}>
                    Go to profile
                </Link></p>
                
                <p className="pointer" onClick={() => setShowOptions(false)}>
                    Cancel
                </p>
            </Modal>
        </>
    );
};

export default Post;
