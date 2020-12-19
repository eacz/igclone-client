import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosClient from '../../config/config';
import userContext from '../../context/userContext/userContext';
import Header from '../Layout/Header';
import Spinner from '../Layout/Spinner';
import UserListItem from '../UserListItem';

const UsersList = () => {
    const history = useHistory();
    const { listUserToDisplay, /*updateListUser*/ } = useContext(userContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!listUserToDisplay) return
        const fetchUsersDetails = async () => {
            setLoading(true);
            try {
                const data = await axiosClient.post('/user/list_details', {usersIDS: listUserToDisplay});
                setUsers(data.data.users);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchUsersDetails();
        /*
        return function cleanup() {
            setUsers([]);
            updateListUser([])
        }*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listUserToDisplay]);
    return (
        <>
            <Header />
            <div className="userlist">
                <p className="go-back blue-text" onClick={() => history.goBack()}>
                    Go back
                </p>
                {loading && (
                    <div className="center-spinner">
                        <Spinner />
                    </div>
                )}

                {users.map((user) => (
                    <UserListItem userL={user} key={user._id} />
                ))}
            </div>
        </>
    );
};

export default UsersList;
