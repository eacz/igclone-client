import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Header from './components/Layout/Header';
import CreatePost from './components/screens/CreatePost';
import UserState from './context/userContext/userState';
import PrivateRoute from './components/PrivateRoute';
import React from 'react';
import authToken from './config/authToken';
import PostDetails from './components/screens/PostDetails';
import ProfileUser from './components/screens/ProfileUser';
function App() {
    const token = localStorage.getItem('ig-token');
    authToken(token);
    return (
        <UserState>
            <Router>
                <Header />
                <Route path="/post/:postID" component={PostDetails} />
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/user/:userID" component={ProfileUser} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/newpost" component={CreatePost} />
            </Router>
        </UserState>
    );
}

export default App;
