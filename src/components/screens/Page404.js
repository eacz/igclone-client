import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
    return (
        <div className="page-404">
            <h1>Page not found</h1>
            <i className="far fa-frown-open"></i>
            <div className="links">
                <p>You might want to try:</p>
                <div className="options">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Page404
