import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
function App() {
    return (
        <Router>
            <Navbar />
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            
        </Router>
    );
}

export default App;
