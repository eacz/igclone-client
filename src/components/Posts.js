import React, { useContext } from 'react';
import postContext from '../context/postsContext/postContext';
import NoPost from './NoPost';
import Post from './Post';

const Posts = () => {
    const contextPosts = useContext(postContext);
    const { posts } = contextPosts;
    return posts.length === 0 ? (
        <NoPost msg="There's no posts yet, try follow someone!" />
    ) : (
        <div>
            {posts.map((post) => (
                <Post key={post._id} {...post} />
            ))}
        </div>
    );
};

export default Posts;
