import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import userContext from '../../context/userContext/userContext'
import Posts from '../Posts'

const Home = () => {
    const history = useHistory()
    const contextUser = useContext(userContext);
    const {auth} = contextUser

    if(!auth) history.push('/login')
    return (
        <div>
            <Posts />
        </div>
    )
}

export default Home
