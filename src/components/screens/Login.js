import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import userContext from '../../context/userContext/userContext';
import Spinner from '../Layout/Spinner';

const Login = () => {
    const history = useHistory();
    const ContextUser = useContext(userContext);
    const { login, error } = ContextUser;
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [Lerror, setError] = useState(error);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const { email, password } = form;
    const handleLogin = async () => {
        setError(null);
        if (!email || !password) {
            setError('Please, fill all the fields.');

            return;
        }
        setLoading(true);
        const result = await login(form);

        if (result) {
            setError(result);
            setLoading(false);
            return;
        }
        if(history.length <= 2) {
            history.push('/')
            return;
        }
        history.goBack();
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
                <p className="red-text">{Lerror}</p>
                {loading && <Spinner />}

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
                <h6>
                    Forgot your password?{' '}
                    <Link className="blue-text" to="/forgot-password">
                        Reset your password
                    </Link>
                </h6>
            </div>
        </div>
    );
} 

export default Login;
