import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosClient from '../../config/config';

const Signup = () => {
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
    });
    const history = useHistory();
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const { name, email, password, cpassword } = form;
    const handleSignUp = async () => {
        if (!name || !email || !password || !cpassword) {
            setError('Please, fill all the fields.');
            return;
        }
        if (password !== cpassword) {
            setError("The passwords doesn't match");
        }
        setError(null);
        try {
            const data = await axiosClient.post('/auth/signup', form);
            console.log(data);
            setError(null);
            history.push('/');
        } catch (error) {
            console.log(error);
            setError(error.response.data.msg);
        }
    };

    return (
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
                <p className="red-text">{error}</p>
                <button
                    className="btn waves-effect waves-light blue"
                    type="submit"
                    name="action"
                    onClick={handleSignUp}>
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
