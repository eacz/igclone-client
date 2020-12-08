import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Header from './components/Header';
import CreatePost from './components/screens/CreatePost';
function App() {
    return (
        <Router>
            <Header />
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/newpost' component={CreatePost} />
        </Router>
    );
}

export default App;
