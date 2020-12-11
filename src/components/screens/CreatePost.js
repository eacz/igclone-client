import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosClient from '../../config/config';
import { useHistory } from 'react-router-dom';
import Spinner from '../Layout/Spinner';

const CreatePost = () => {
    const history = useHistory();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState({
        title: '',
        body: '',
        photo: '',
        photoURL: '',
    });
    const { title, body, photo, photoURL } = post;
    //due to setState is asynchonous, I've to use a useEffect to post to server
    useEffect(() => {
        if (!photoURL) return;
        const postToServer = async () => {
            //save the post in db
            try {
                //im gonna use this data later
                const newPost = await axiosClient.post(
                    '/post',
                    { ...post, photo: photoURL },
                    {
                        headers: {
                            'x-auth-token': localStorage.getItem('ig-token'),
                        },
                    }
                );
                setLoading(false)
                history.push('/');
            } catch (error) {
                setLoading(false)
                setError('Something went wrong, please try again.');
            }
        };
        postToServer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photoURL]);

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };

    const handlePost = async () => {
        if (!title || !body || !photo) {
            setError('Please fill all the fields');
            return;
        }
        setError(null);
        setLoading(true);

        const data = new FormData();
        data.append('file', photo);
        data.append('upload_preset', 'igclone');
        data.append('cloud_name', 'dbyrp5tgh');
        try {
            //upload the image to cloudinary
            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/dbyrp5tgh/image/upload',
                data
            );
            setPost({ ...post, photoURL: res.data.secure_url });
        } catch (error) {
            setError(
                'Something went wrong uploading the image, please try again.'
            );
        }
    };
    return (
        <div className="card-shadow new-post">
            <h4>Create a new post!</h4>
            <div className="input-field">
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
                <label htmlFor="title">Title</label>
            </div>
            <div className="input-field">
                <textarea
                    id="body"
                    name="body"
                    value={body}
                    onChange={handleChange}
                    className="materialize-textarea"
                ></textarea>
                <label htmlFor="body">Body</label>
            </div>
            <div className="file-field input-field">
                <div className="btn blue">
                    <span>Upload image</span>
                    <input
                        type="file"
                        name="photo"
                        onChange={(e) =>
                            setPost({ ...post, photo: e.target.files[0] })
                        }
                    />
                </div>
                <div className="file-path-wrapper">
                    <input
                        className="file-path validate"
                        type="text"
                        name="photo"
                        id="photo"
                    />
                </div>
            </div>
            <p className="red-text">{error}</p>
            {loading && <Spinner />}
            <div className="btn-container">
                <button className="btn blue" onClick={() => handlePost()}>
                    Post it
                </button>
            </div>
        </div>
    );
};

export default CreatePost;
