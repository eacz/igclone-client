import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import axiosClient from '../../config/config';
import userContext from '../../context/userContext/userContext';
import { validatePasswordAndEmail } from '../../shared/helpers';
import Spinner from '../Layout/Spinner';

const Signup = () => {
    const { auth } = useContext(userContext);
    const [Lerror, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        username: '',
        photo: '',
        photoURL: '',
    });
    const {
        name,
        email,
        password,
        cpassword,
        username,
        photo,
        photoURL,
    } = form;
    useEffect(() => {
        setLoading(false);
        if (!photoURL || Lerror) return;
        const postToServer = async () => {
            setLoading(true);
            try {
                //im gonna use this data later
                const data = await axiosClient.post('/auth/signup', {
                    ...form,
                    photo: form.photoURL,
                });
                setError(null);
                setLoading(false);
                history.push('/login');
            } catch (error) {
                setLoading(false);
                setError(error.response.data.msg);
            }
        };
        postToServer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photoURL]);
    const history = useHistory();
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignUp = async () => {
        if (!name || !email || !password || !cpassword || !username) {
            setError('Please, fill all the fields.');
            return;
        }
        if (username.includes(' ')) {
            setError("The username can't have spaces");
            return;
        }
        if (password !== cpassword) {
            setError("The passwords doesn't match");
            return;
        }

        const result = validatePasswordAndEmail(password, email);
        if (result) {
            setError(result);
            return;
        }
        setError(null);
        setLoading(true);
        if (photo) {
            const data = new FormData();
            data.append('file', photo);
            data.append('upload_preset', 'igclone');
            data.append('cloud_name', 'dbyrp5tgh');

            try {
                const res = await axios.post(
                    'https://api.cloudinary.com/v1_1/dbyrp5tgh/image/upload',
                    data
                );
                setForm({ ...form, photoURL: res.data.secure_url });
            } catch (error) {
                setLoading(false);
                setError(error.response?.data.msg);
            }
        } else {
            setForm({
                ...form,
                photoURL:
                    'https://res.cloudinary.com/dbyrp5tgh/image/upload/v1607632799/igclone/defaultuser_llqwsw.jpg',
            });
        }
    };

    return auth ? (
        <Redirect to="/" />
    ) : (
        <div className="card-m">
            <div className="card auth-card">
                <h2 className="logo">Instagram</h2>
                <div className="input-field">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleChange}
                    />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={handleChange}
                    />
                    <label htmlFor="username">Username</label>
                </div>

                <div className="input-field">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="input-field">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                </div>

                <div className="input-field">
                    <input
                        type="password"
                        id="cpassword"
                        name="cpassword"
                        value={cpassword}
                        onChange={handleChange}
                    />
                    <label htmlFor="cpassword">Confirm password</label>
                </div>
                <div className="file-field input-field">
                    <div className="btn blue">
                        <span>Upload image</span>
                        <input
                            type="file"
                            name="photo"
                            onChange={(e) =>
                                setForm({ ...form, photo: e.target.files[0] })
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

                <p className="red-text">{Lerror}</p>
                {loading && <Spinner />}
                <button
                    className="btn waves-effect waves-light blue"
                    type="submit"
                    name="action"
                    onClick={handleSignUp}
                >
                    Sign up
                </button>
                <h6>
                    Already have an account?{' '}
                    <Link className="blue-text" to="/login">
                        Login
                    </Link>
                </h6>
            </div>
        </div>
    );
};

export default Signup;
