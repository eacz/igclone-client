import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosClient from '../../config/config';
import postContext from '../../context/postsContext/postContext';
import Comments from '../Comments';
import Header from '../Layout/Header';
import Spinner from '../Layout/Spinner';

const CommentsScreenList = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const { postCommentsToFetch } = useContext(postContext);
    useEffect(() => {
        setLoading(true);
        const fetchComments = async () => {
            try {
                const data = await axiosClient(
                    `/comment/${postCommentsToFetch}`
                );
                setComments(data.data.comments);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError('Something went wrong');
            }
        };
        fetchComments();
    }, [postCommentsToFetch]);
    return loading ? (
        <>
            <Header />
            <div className="comments-list">
                <p
                    className="blue-text go-back"
                    onClick={() => history.goBack()}
                >
                    Go back
                </p>
            </div>
            <div className="center-spinner">
                <Spinner />
            </div>
        </>
    ) : (
        <>
            <Header />
            <div className="comments-list">
                <p
                    className="blue-text go-back"
                    onClick={() => history.goBack()}
                >
                    Go back
                </p>
                <p className="error">{error}</p>
                <div className="comment-detail">
                    <Comments comments={comments} detail={true} />
                </div>
                
            </div>
        </>
    );
};

export default CommentsScreenList;
