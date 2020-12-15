import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import userContext from '../context/userContext/userContext';

const UserListItem = ({ userL }) => {
    const history = useHistory()
    const { user } = useContext(userContext);
    return (
        <div className="userlist-item">
            <div className="left" onClick={() => history.push(`/user/${userL._id}`)}>
                <img src={userL.photo} alt={userL.username} />
                <p>{userL.username}</p>
            </div>
            <div className="right">
                {userL._id === user._id ? null : (
                    <button
                        className={`btn  ${
                            user.following.includes(userL._id)
                                ? 'white black-text btn-f'
                                : 'blue btn-nf'
                        }`}
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
