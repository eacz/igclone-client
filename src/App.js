import './App.css';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import UserState from './context/userContext/userState';
import PrivateRoute from './components/PrivateRoute';
import React from 'react';
import authToken from './config/authToken';
import PostDetails from './components/screens/PostDetails';
import ProfileUser from './components/screens/ProfileUser';
import Page404 from './components/screens/Page404';
import PostsState from './context/postsContext/postState';
import ConfigProfile from './components/screens/ConfigProfile';
function App() {
    const token = localStorage.getItem('ig-token');
    authToken(token);

    return (
        <UserState>
            <PostsState>
                <Router>
                    <Switch>
                        <Route path="/post/:postID" component={PostDetails} />
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/user/:userID" component={ProfileUser} />
                        <PrivateRoute exact path="/profile" component={Profile} />
                        <PrivateRoute exact path="/profile/config" component={ConfigProfile} />
                        <PrivateRoute path="/newpost" component={CreatePost} />
                        <Route path="/404" component={Page404} />
                        <Redirect to="/404" />
                    </Switch>
                </Router>
            </PostsState>
        </UserState>
    );
}

export default App;
