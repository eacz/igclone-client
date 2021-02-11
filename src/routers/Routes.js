import React from 'react';
import {
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

//routes
import Home from '../components/screens/Home';
import Profile from '../components/screens/Profile';
import Login from '../components/screens/Login';
import Signup from '../components/screens/Signup';
import CreatePost from '../components/screens/CreatePost';
import PrivateRoute from './PrivateRoute';
import PostDetails from '../components/screens/PostDetails';
import ProfileUser from '../components/screens/ProfileUser';
import Page404 from '../components/screens/Page404';
import PostsState from '../context/postsContext/postState';
import ConfigProfile from '../components/screens/ConfigProfile';
import UsersList from '../components/screens/UsersList';
import CommentsScreenList from '../components/screens/CommentsScreenList';
import ModifyProfileInfo from '../components/ModifyProfileInfo';
import ResetPassword from '../components/ResetPassword';
import ForgotPassword from '../components/ForgotPassword';
import Search from '../components/Search';
import SearchState from '../context/searchContext/searchState';
import SavedPosts from '../components/screens/SavedPosts';
import PublicRoute from './PublicRoute';


const Routes = ({isAuth}) => {
    return (
        <PostsState>
        <SearchState>

                <Switch>
                    <Route isAuth={isAuth} exact path="/post/:postID" component={PostDetails} />
                    <PrivateRoute isAuth={isAuth} exact path="/post/:postID/comments" component={CommentsScreenList}/>
                    <PublicRoute isAuth={isAuth} exact path="/forgot-password" component={ForgotPassword} />
                    <PrivateRoute isAuth={isAuth} exact path="/" component={Home} />
                    <PrivateRoute isAuth={isAuth} exact path="/search" component={Search} />
                    <PublicRoute isAuth={isAuth} path="/login" component={Login} />
                    <PublicRoute isAuth={isAuth} path="/signup" component={Signup} />
                    <Route isAuth={isAuth} path="/user/:userID" component={ProfileUser} />
                    <PrivateRoute isAuth={isAuth} exact path="/profile" component={Profile} />
                    <PrivateRoute isAuth={isAuth} exact path="/profile/config" component={ConfigProfile} />
                    <PrivateRoute isAuth={isAuth} exact path="/profile/config/profile-info" component={ModifyProfileInfo} />
                    <PrivateRoute isAuth={isAuth} exact path="/profile/config/reset-password" component={ResetPassword} />
                    <PrivateRoute isAuth={isAuth} path="/newpost" component={CreatePost} />
                    <PrivateRoute isAuth={isAuth} path="/userlist" component={UsersList} />
                    <PrivateRoute isAuth={isAuth} path="/posts_saved" component={SavedPosts} />
                    
                    <Route isAuth={isAuth} path="/404" component={Page404} />
                    <Redirect to="/404" />
                </Switch>
 
        </SearchState>
    </PostsState>
    )
}

export default Routes