import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiosClient from '../../config/config';
import Header from '../Layout/Header';
import Spinner from '../Layout/Spinner';
import Post from '../Post';

const PostDetails = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const { postID } = useParams();
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axiosClient(`/post/${postID}`);
                if(res.data.post === undefined) throw new Error(res.data.msg);
                setPost(res.data.post);
                setLoading(false);
            } catch (error) {
                history.push('/404')
            }
        };
        fetchPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            {loading ? (
                <>
                    <Header />
                    <div className="center-spinner">
                        <Spinner />
                    </div>
                </>
            ) : (
                <>
                    <Header />
                    <Post {...post} />
                </>
            )}
        </div>
    );
};

export default PostDetails;
