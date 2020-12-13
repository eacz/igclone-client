import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../config/config';
import userContext from '../../context/userContext/userContext';
import Header from '../Layout/Header';
import Spinner from '../Layout/Spinner';
import NoPost from '../NoPost';

const Profile = () => {
    const contextUser = useContext(userContext);
    const {
        user: { name, username, photo, description },
    } = contextUser;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const posts = await axiosClient.get('/post/user');
                setPosts(posts.data.posts);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError('Something went wrong, please try again');
            }
        };
        fetchPost();
    }, []);
    return (
        <>
            <Header />
            <div className="profile-container">
                <div className="profile">
                    <div className="header">
                        <img src={photo} alt="profile" />
                        <div className="user-info">
                            <p>@{username}</p>
                            <div className="profile-info">
                                <h5 className="black-text">
                                    40 <span className="grey-text">posts</span>
                                </h5>
                                <h5 className="black-text">
                                    40{' '}
                                    <span className="grey-text">followers</span>
                                </h5>
                                <h5 className="black-text">
                                    70{' '}
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
                                {posts.length} <span className="grey-text">posts</span>
                            </h5>
                            <h5 className="black-text">
                                40 <span className="grey-text">followers</span>
                            </h5>
                            <h5 className="black-text">
                                70 <span className="grey-text">following</span>
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
                    {!loading && posts.length === 0 && <NoPost />}
                    {posts.map((post) => (
                        <Link to={`/post/${post._id}`}>
                            <img
                                key={post.photo}
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

export default Profile;
