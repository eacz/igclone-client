import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosClient from '../../config/config';
import postContext from '../../context/postsContext/postContext';
import userContext from '../../context/userContext/userContext';
import Header from '../Layout/Header';
import Spinner from '../Layout/Spinner';
import Posts from '../Posts';

const Home = () => {
    const history = useHistory();
    const contextUser = useContext(userContext);
    const { auth } = contextUser;
    const { setInitialPosts, loading, setPostError } = useContext(postContext);
    useEffect(() => {
        const fetchHomePosts = async () => {
            try {
                const res = await axiosClient.get('/post/following');
                setInitialPosts(res.data.posts);
            } catch (error) {
                setPostError('Something went wrong')
                console.log(error);
            }
        };
        fetchHomePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!auth) history.push('/login');
    return loading ? (
        <>
        <Header />
        <div className="center-spinner">
            <Spinner />
        </div>
        </>
    ) : (
        <div>
            <Header />
            <Posts />
        </div>
    );
};

export default Home;
