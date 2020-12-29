import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';
const ConfigProfile = () => {
    return (
        <>
            <Header />
            <div className="configuration">
                <h2>Configuration</h2>
                <div className="options">
                    <Link to="/profile/config/profile-info">
                        Modify Profile's info
                    </Link>
                    <Link to="/profile/config/reset-password">
                        Reset Password
                    </Link>
                    <Link to="/posts_saved">
                        Posts saved
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ConfigProfile;
