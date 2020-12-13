import React from 'react';
import Post from './Post';

const Posts = () => {
    const posts = [
        {
            _id: 1,
            photo:
                'https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_960_720.jpg',
            postedBy: {
                username: 'CatObses',
                photo:
                    'https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_960_720.jpg',
            },
            title: 'Blackie',
            body: 'My cat playing',
            likes: 2302,
            posted: 'Now',
            comments: [
                {
                    _id: 1,
                    user: 'user1',
                    comment: 'Beautiful',
                },
                {
                    _id: 2,
                    user: 'user2',
                    comment: 'So cute!!',
                },
            ],
        },
        {
            _id: 2,
            photo:
                'https://cdn.pixabay.com/photo/2017/07/04/09/06/landscape-2470398_960_720.jpg',
            postedBy: {
                username: 'papadopulus',
                photo:
                    'https://cdn.pixabay.com/photo/2017/07/04/09/06/landscape-2470398_960_720.jpg',
            },
            title: 'Loving greece',
            body: 'Weekend on Mykonos!!',
            likes: 305,
            posted: 'A day ago',
            comments: [
                {
                    _id: 1,
                    user: 'user1',
                    comment: 'Next time invite me!!',
                },
                {
                    _id: 2,
                    user: 'user2',
                    comment: 'I love greece!!',
                },
            ],
        },
    ];
    return (
        <div>
            {posts.map((post) => (
                <Post key={post._id} {...post} />
            ))}
        </div>
    );
};

export default Posts;
