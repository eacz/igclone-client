import React from 'react';

const Post = ({ img, user, desc, likes, comments, posted }) => {
    return (
        <div className="post">
            <div className="header">
                <div className="user">
                    <img src={user.pic} alt="user pic" />
                    <p>{user.name}</p>
                </div>
                <i className="fas fa-ellipsis-h"></i>
            </div>
            <img src={img} alt="phot" />
            <div className="buttons">
                <div className="principal">
                    <i className="far fa-heart"></i>
                    <i className="far fa-comment"></i>
                    <i className="far fa-paper-plane"></i>
                </div>

                <i className="far fa-bookmark"></i>
            </div>
            <p className="likes">{likes} Likes</p>
            <p className="post-body">
                {' '}
                <span>{user.name}</span> {desc}
            </p>
            <div className="comments">
                {comments.map((comment) => (
                    <p key={comment._id}>
                        <span>{comment.user}</span> {comment.comment}
                    </p>
                ))}
            </div>
            <p className="posted">{posted}</p>
            <div className="leave-comment">
                <input type="text" placeholder="Leave a comment" />
                <p className="blue-text">Post</p>
            </div>
        </div>
    );
};

export default Post;
