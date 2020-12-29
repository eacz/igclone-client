import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../config/config';
import Header from '../Layout/Header';
import Spinner from '../Layout/Spinner';
import NoPost from '../NoPost';

const SavedPosts = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        setLoading(true);
        const fetchPosts = async () => {
            try {
                const res = await axiosClient.get('/user/post_saved');
                console.log(res);
                setPosts(res.data.posts);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError('Something went wrong, please reload')
            }
        };
        fetchPosts();
    }, []);
    return (
        <>
            <Header />
            <div className="configuration">
                <h2>Saved Posts</h2>

                <div className="upper-gray-line">
                    {' '}
                    {error && <p>{error}</p>}
                    {loading && (
                        <div className="center-spinner">
                            <Spinner />
                        </div>
                    )}
                    {!loading && posts.length === 0 && <NoPost />}
                    <div className="gallery">
                        {posts.map((post) => (
                            <Link key={post._id} to={`/post/${post._id}`}>
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
            </div>
        </>
    );
};

export default SavedPosts;
