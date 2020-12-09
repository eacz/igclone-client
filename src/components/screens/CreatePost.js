import React, { useState } from 'react';

const CreatePost = () => {
    const [post, setPost] = useState({
        title: '',
        body: '',
        photo: '',
    });
    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };
    const {title, body, photo} = post
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
                    class="materialize-textarea"
                ></textarea>
                <label htmlFor="body">Body</label>
            </div>
            <div class="file-field input-field">
                <div class="btn blue">
                    <span>Upload image</span>
                    <input type="file" name="photo" onChange={handleChange}/>
                </div>
                <div class="file-path-wrapper">
                    <input
                        class="file-path validate"
                        type="text"
                        name="photo"
                        id="photo"
                        value={photo}
                    />
                </div>
            </div>
            <div className="btn-container">
                <button className="btn blue">Post it</button>
            </div>
        </div>
    );
};

export default CreatePost;
