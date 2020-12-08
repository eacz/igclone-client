import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div className="card-m">
            <div className="card auth-card">
                <h2 className="logo">Instagram</h2>
                <div className="input-field">
                    <input type="text" name="name" id="name" />
                    <label htmlFor="name">Name</label>
                </div>

                <div className="input-field">
                    <input type="text"  id="email" name="email" />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="input-field">
                    <input type="password" id="password" name="password" />
                    <label htmlFor="password">Password</label>
                </div>

                <div className="input-field">
                    <input type="password" id="cpassword" name="cpassword" />
                    <label htmlFor="cpassword">Confirm password</label>
                </div>

                <button
                    className="btn waves-effect waves-light blue"
                    type="submit"
                    name="action">
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
