import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axiosClient from '../config/config';
import userContext from '../context/userContext/userContext';

const UserListItem = ({ userL }) => {
    const history = useHistory()
    const {auth, user, updateUser, } = useContext(userContext);

    
    const handleFollowUnfollow = async () => {
        if(!auth) return;
        const data = { userID: userL._id, follow: !user.following.includes(userL._id) };
        try {
            const res = await axiosClient.post('/user/follow', data);
            updateUser(res.data.user);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="userlist-item">
            <div className="left" onClick={() => history.push(`/user/${userL._id}`)}>
                <img src={userL.photo} alt={userL.username} />
                <p>{userL.username}</p>
            </div>
            <div className="right">
                {userL._id === user._id  && auth ? null : (
                    <button
                        className={`btn  ${
                            user.following.includes(userL._id)
                                ? 'white black-text btn-f'
                                : 'blue btn-nf'
                        }`
                    }
                    onClick={() => handleFollowUnfollow()}
                    >
                        {user.following.includes(userL._id)
                            ? 'Following'
                            : 'Follow'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserListItem;
