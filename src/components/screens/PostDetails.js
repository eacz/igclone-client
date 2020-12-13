import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../config/config';
import Spinner from '../Layout/Spinner';
import Post from '../Post';

const PostDetails = () => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const { postID } = useParams();
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axiosClient(`/post/${postID}`);
                setPost(res.data.post)
                console.log(res.data.post);
                setLoading(false)
                console.log(post);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            {loading ? (
                <div className="center-spinner">
                    <Spinner />
                </div>
            ) : (
                <Post {...post} />
            )}
        </div>
    );
};

export default PostDetails;
