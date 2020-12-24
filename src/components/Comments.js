import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import postContext from '../context/postsContext/postContext';
import Comment from './Comment';
import CommentDetail from './CommentDetail';

const Comments = ({ comments, detail, post }) => {
    const history = useHistory()
    const {setCommentsToFetch} = useContext(postContext);
    const [commentsL, setCommentsL] = useState(comments)

    const redirectToCommentsList = () => {
        setCommentsToFetch(post);
        history.push(`/post/${post}/comments`)
    }
    return detail ? (
        <div className="comments">
            {commentsL.map((comment) => (
                <CommentDetail setComments={setCommentsL} key={comment._id} comment={comment} />
            ))}
        </div>
    ) : (
        <>
            <div className="comments-post">
                {comments.length > 1 && <p onClick={() => redirectToCommentsList()} className="all-comments">See the all the comments</p >}
                <Comment comment={comments[comments.length - 1]} />
            </div>
        </>
    );
};

export default Comments;
