import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import axiosClient from '../../config/config';
import userContext from '../../context/userContext/userContext';
import Header from '../Layout/Header';
import Spinner from '../Layout/Spinner';
import NoPost from '../NoPost';

const ProfileUser = () => {
    const { userID } = useParams();
    const contextUser = useContext(userContext);
    const { auth, user, updateUser } = contextUser;
    const [profile, setProfile] = useState({
        user: {
            name: '',
            username: '',
            photo: '',
            description: '',
            followers: [],
            following: [],
        },
        posts: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (auth && user._id === userID) return;
        const fetchUser = async () => {
            try {
                const profile = await axiosClient(`/user/${userID}`);
                setProfile(profile.data);
                setLoading(false);
            } catch (error) {
                setError('Something went wrong, please reload');
                setLoading(false);
            }
        };
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID]);
    const {
        name,
        username,
        photo,
        description,
        followers,
        following,
    } = profile.user;

    const handleFollowUnfollow = async () => {
        const data = { userID, follow: !user.following.includes(userID) };
        try {
            const res = await axiosClient.post('/user/follow', data);
            updateUser(res.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    return auth && user._id === userID ? (
        <Redirect to="/profile" />
    ) : loading ? (
        <>
            <Header />
            <div className="center-spinner">
                <Spinner />
            </div>
        </>
    ) : error ? (
        <p>{error}</p>
    ) : (
        <>
            <Header />

            <div className="profile-container">
                <div className="profile">
                    <div className="header">
                        <img src={photo} alt="profile" />
                        <div className="user-info">
                            <p>@{username}</p>
                            {auth && (
                                <button
                                    className="btn blue"
                                    onClick={() => handleFollowUnfollow()}
                                >
                                    {user.following.includes(userID)
                                        ? 'Unfollow'
                                        : 'Follow'}
                                </button>
                            )}
                            <div className="profile-info">
                                <h5 className="black-text">
                                    {profile.posts.length}
                                    <span className="grey-text">posts</span>
                                </h5>
                                <h5 className="black-text">
                                    {followers.length + ' '}
                                    <span className="grey-text">followers</span>
                                </h5>
                                <h5 className="black-text">
                                    {following.length + ' '}
                                    <span className="grey-text">following</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="body">
                        <h4>{name}</h4>
                        <p>{description}</p>
                        <div className="profile-info">
                            <h5 className="black-text">
                                {profile.posts.length}{' '}
                                <span className="grey-text">posts</span>
                            </h5>
                            <h5 className="black-text">
                                {followers.length + ' '}{' '}
                                <span className="grey-text">followers</span>
                            </h5>
                            <h5 className="black-text">
                                {following.length + ' '}
                                <span className="grey-text">following</span>
                            </h5>
                        </div>
                        <p>{error}</p>
                    </div>
                </div>
                <div className="gallery">
                    {loading && (
                        <div className="center-spinner">
                            <Spinner />
                        </div>
                    )}
                    {!loading && profile.posts.length === 0 && <NoPost />}
                    {profile.posts.map((post) => (
                        <Link to={`/post/${post._id}`} key={post._id}>
                            <img
                                key={post._id}
                                className="gallery-item"
                                src={post.photo}
                                alt={post.title}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProfileUser;
