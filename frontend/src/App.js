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
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid">
              <ul className="navbar-nav mr-3">
                <li><Link to={'/'} className="nav-link "> Home </Link></li>
                <li><Link to={'/post'} className="nav-link"> Post </Link></li>
              </ul>
              <ul className="navbar-nav mr-3">
                <li>
                  <form  >
                    <div className="form-group d-flex" >
                      <input type="text" value={search} placeholder="search..." onChange={(e)=>setSearch(e.target.value)} className="form-control" />
                      <Link to={`/?search=${search}`} ><input type="submit" value="search" className="btn btn-outline-success my-2 my-sm-0"/></Link>
                    </div>
                  </form>
                </li> 
              </ul>
            </div>
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
