import React, { useContext, useState } from 'react';
import axiosClient from '../config/config';
import postContext from '../context/postsContext/postContext';

const LeaveComment = ({ postID, setPComments , inputRef}) => {
    const { addComment } = useContext(postContext);
    const [comment, setComment] = useState('');

    const postComment = async () => {
        if (! comment.trim()) return;

        try {
            const data = await axiosClient.post('/comment', {postID, comment});
            const newComment = {...data.data.newComment, postedBy: data.data.userData}
            addComment(newComment);
            setPComments(comments => [...comments, newComment])
            setComment('')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="leave-comment">
            <input
                type="text"
                placeholder="Leave a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                ref={inputRef}
            />
            <p
                className={`${comment.trim() ? 'blue-text pointer' : 'grey-text'}`}
                onClick={() => postComment()}
            >
                Post
            </p>
        </div>
    );
};

export default LeaveComment;
