import React from 'react';

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile">
                <div className="header">
                    <img
                        src="https://images.unsplash.com/photo-1585925130019-eeafcd31b7f3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt="profile"
                    />
                    <p>Username</p>
                </div>
                <div className="body">
                    <h4>Katrine Douglas</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt neque illo distinctio rem sed quasi dolore quibusdam ipsum quam odit facere, modi incidunt suscipit eos iusto similique dolor id vero?</p>
                    <div className="profile-info">
                        <h5 className="black-text">40 <span className="grey-text">posts</span></h5>
                        <h5 className="black-text">40 <span className="grey-text">followers</span></h5>
                        <h5 className="black-text">70 <span className="grey-text">following</span></h5>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <img className="gallery-item" src="https://images.unsplash.com/photo-1585925130019-eeafcd31b7f3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="gallery 1" />
                <img className="gallery-item" src="https://images.unsplash.com/photo-1585925130019-eeafcd31b7f3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="gallery 1" />
                <img className="gallery-item" src="https://images.unsplash.com/photo-1585925130019-eeafcd31b7f3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="gallery 1" />
                <img className="gallery-item" src="https://images.unsplash.com/photo-1585925130019-eeafcd31b7f3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="gallery 1" />
                <img className="gallery-item" src="https://images.unsplash.com/photo-1585925130019-eeafcd31b7f3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="gallery 1" />
            </div>
        </div>
    );
};

export default Profile;
