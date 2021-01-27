import React, { useContext, useEffect } from 'react';
import axiosClient from '../../config/config';
import postContext from '../../context/postsContext/postContext';
import Header from '../Layout/Header';
import Spinner from '../Layout/Spinner';
import Posts from '../Posts';

const Home = () => {
    const { setInitialPosts, loading, setPostError, refetch } = useContext(postContext);
    useEffect(() => {
        const fetchHomePosts = async () => {
            try {
                const res = await axiosClient.get('/post/following');
                setInitialPosts(res.data.posts);
            } catch (error) {
                setPostError('Something went wrong');
                console.log(error);
            }
        };
        fetchHomePosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <>
                <Header />
                <div className='center-spinner'>
                    <Spinner />
                </div>
            </>
        );
    }

    return (
        <div>
            <Header />
            <Posts />
        </div>
    );
};

export default Home;
