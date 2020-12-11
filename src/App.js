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
function App() {
    const token = localStorage.getItem('ig-token');
    authToken(token)
    return (
        <UserState>
            <Router>
                <Header />
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/profile" component={Profile} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/newpost" component={CreatePost} />
            </Router>
        </UserState>
    );
}

export default App;
