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
import UsersList from './components/screens/UsersList';
import CommentsScreenList from './components/screens/CommentsScreenList';
import ModifyProfileInfo from './components/ModifyProfileInfo';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import Search from './components/Search';
import SearchState from './context/searchContext/searchState';
function App() {
    const token = localStorage.getItem('ig-token');
    authToken(token);

    return (
        <UserState>
            <PostsState>
                <SearchState>
                    <Router>
                        <Switch>
                            <Route exact path="/post/:postID" component={PostDetails} />
                            <Route exact path="/post/:postID/comments" component={CommentsScreenList}/>
                            <Route exact path="/forgot-password" component={ForgotPassword} />
                            <Route exact path="/" component={Home} />
                            <PrivateRoute exact path="/search" component={Search} />
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={Signup} />
                            <Route path="/user/:userID" component={ProfileUser} />
                            <PrivateRoute exact path="/profile" component={Profile} />
                            <PrivateRoute exact path="/profile/config" component={ConfigProfile} />
                            <PrivateRoute exact path="/profile/config/profile-info" component={ModifyProfileInfo} />
                            <PrivateRoute exact path="/profile/config/reset-password" component={ResetPassword} />
                            <PrivateRoute path="/newpost" component={CreatePost} />
                            <PrivateRoute path="/userlist" component={UsersList} />
                            
                            <Route path="/404" component={Page404} />
                            <Redirect to="/404" />
                        </Switch>
                    </Router>
                </SearchState>
            </PostsState>
        </UserState>
    );
}

export default App;
