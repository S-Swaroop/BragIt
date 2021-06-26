import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import { useState } from 'react'

import Home from './components/Home/Home'
import Post from './components/Post/Post'
import Details from './components/Details/Details'
import Edit from './components/Edit/Edit'

import './App.css'

function App() {
  const [search, setSearch] = useState("")
  return (
    <Router>
        <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <ul className="navbar-nav mr-auto">
              <li><Link to={'/'} className="nav-link"> Home </Link></li>
              <li>
                <form >
                  <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
                  <Link to={`/?search=${search}`} ><input type="submit" value="search"/></Link>
                </form>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li><Link to={'/post'} className="nav-link"> Post </Link></li>
            </ul>
          </nav>
          
          <Switch>
              <Route exact path='/post' component={Post}/>
              <Route path='/edit' component={Edit} />
              <Route path='/blogs' component={Details} />
              <Route path='/' component={Home} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
