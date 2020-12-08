import React from 'react';

const CreatePost = () => {
    return (
        <div className="card-shadow new-post">
            <h4>Create a new post!</h4>
            <div className="input-field">
                <input type="text" id="title" name="title" />
                <label htmlFor="title">Title</label>
            </div>
            <div className="input-field">
                <textarea
                    id="body"
                    name="body"
                    class="materialize-textarea"></textarea>
                <label htmlFor="body">Body</label>
                <div className="btn-container">
                    
                <button className="btn blue">Post</button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
