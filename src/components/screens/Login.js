import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosClient from '../../config/config';

const Login = () => {
    const history = useHistory();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const { email, password } = form;
    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please, fill all the fields.');
            return;
        }
        try {
            const data = await axiosClient.post('/auth/signin', form);
            const { token } = data.data;
            console.log(token);
            setError(null);
            history.push('/');
        } catch (error) {
            console.log(error);
            setError(error.response?.data.msg);
        }
    };

    return (
        <div className="card-m">
            <div className="card auth-card">
                <h2 className="logo">Instagram</h2>
                <div className="input-field">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="validate"
                        onChange={handleChange}
                        value={email}
                    />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="input-field">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={password}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <p className="red-text">{error}</p>

                <button
                    className="btn waves-effect waves-light blue"
                    type="submit"
                    name="action"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <h6>
                    You don't have an account?{' '}
                    <Link className="blue-text" to="/signup">
                        Sign up
                    </Link>
                </h6>
            </div>
        </div>
    );
};

export default Login;
