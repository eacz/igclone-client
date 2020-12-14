import React from 'react'

const NoPost = ({msg = "There's no post yet"}) => {
    return (
        <div className="no-post">
            <i className="fas fa-camera"></i>
            <p>{msg}</p>
        </div>
    )
}

export default NoPost
