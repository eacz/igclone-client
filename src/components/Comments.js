import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import postContext from '../context/postsContext/postContext';
import Comment from './Comment';

const Comments = ({ comments, detail, post }) => {
    const history = useHistory()
    const {setCommentsToFetch} = useContext(postContext);

    const redirectToCommentsList = () => {
        setCommentsToFetch(post);
        history.push(`/post/${post}/comments`)
    }
    return detail ? (
        <div className="comments">
            {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
            ))}
        </div>
    ) : (
        <>
            <div className="comments-post">
                {comments.length > 1 && <p onClick={() => redirectToCommentsList()} className="all-comments">See the all the comments</p >}
                <Comment comment={comments[0]} />
            </div>
        </>
    );
};

export default Comments;
