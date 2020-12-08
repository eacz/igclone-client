import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="card-m">
            <div className="card auth-card">
                <h2 className="logo">Instagram</h2>
                <div className="input-field">
                    <input type="text" name="email" id="email" className="validate"/>
                    <label htmlFor="email">Email</label>
                </div>
                
                <div className="input-field">
                    <input type="password" id="password" name="password" />
                    <label htmlFor="password">Password</label>
                </div>
                
                <button
                    className="btn waves-effect waves-light blue"
                    type="submit"
                    name="action">
                    Login
                </button>
                <h6>You don't have an account? <Link className="blue-text" to="/signup">Sign up</Link></h6>

            </div>
        </div>
    );
};

export default Login;
