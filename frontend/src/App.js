import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'


import Home from './components/Home/Home'
import Post from './components/Post/Post'
import Details from './components/Details/Details'
import Edit from './components/Edit/Edit'

import './App.css'

function App() {
  return (
    <Router>
        <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <ul className="navbar-nav mr-auto">
              <li><Link to={'/'} className="nav-link"> Home </Link></li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li><Link to={'/post'} className="nav-link"> Post </Link></li>
            </ul>
          </nav>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/post' component={Post}/>
              <Route path='/edit' component={Edit} />
              <Route path='/blogs' component={Details} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
