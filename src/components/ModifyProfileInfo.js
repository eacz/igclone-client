import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosClient from '../config/config';
import userContext from '../context/userContext/userContext';
import Header from './Layout/Header';
import Spinner from './Layout/Spinner';

const ModifyProfileInfo = () => {
    const history = useHistory()
    const { user, updateProfile } = useContext(userContext);
    const [actualInfo, setActualInfo] = useState({
        description: user.description,
        name: user.name,
    });
    const [hasChanged, setHasChanged] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setHasChanged(true);
        setActualInfo({ ...actualInfo, [e.target.name]: e.target.value });
    };

    const { name, description } = actualInfo;


    const saveChanges = async () => {
        if (!hasChanged) return;
        setError(null);
        setLoading(true);
        try {
            const res = await axiosClient.put('/user', actualInfo);
            updateProfile(res.data.user);
            setLoading(false);
            history.push('/profile')
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading(false);
        }
    };
    return (
        <>
        <Header  />
        <div className="configuration">
            <p onClick={() => history.goBack()} className="go-back blue-text">Go back</p>
            <h2>Profile Info</h2>
            <div className="modify-info">
                <h5>Modify Profile's info</h5>
                <div className="input-field">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                </div>
                <div className="input-field">
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        className="materialize-textarea"
                        placeholder="Tell the people a bit about yourself"
                    ></textarea>
                </div>
                {loading ? (
                    <div className="center-spinner">
                        <Spinner />
                    </div>
                ) : null}

                <p className="text-red">{error}</p>

                <div className="btn-container">
                    <button
                        onClick={() => saveChanges()}
                        className={`btn blue waves-effect waves-light ${hasChanged ? '' : 'disabled'}`}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    </>
    )
}

export default ModifyProfileInfo
