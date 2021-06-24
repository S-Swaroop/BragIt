import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'


import Home from './components/Home/Home'
import Post from './components/Post/Post'
import Details from './components/Details/Details'

function App() {
  return (
    <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/post'} className="nav-link"> Post </Link></li>
          </ul>
          </nav>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/post' component={Post}/>
              <Route path='/blogs' component={Details} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
