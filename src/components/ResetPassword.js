import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Layout/Header'

const ResetPassword = () => {
    const history = useHistory()
    return (
        <>
        <Header />
        <p onClick={() => history.goBack()} className="go-back blue-text">Go back</p>
        <div className="configuration">
            <h2>Reset Password</h2>
        </div>
        </>
    )
}

export default ResetPassword
