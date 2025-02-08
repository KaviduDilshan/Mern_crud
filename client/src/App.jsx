import React, { Component } from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './components/home'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className='container'>
        <Navbar/>
        <Route path='/'exact component={Home}></Route>
        <Route path='/add'exact component={createpost}></Route>
        <Route path='/edit/:id'exact component={editpost}></Route>
        <Route path='/post/:id'exact component={postdetails}></Route>
      </div>
      </BrowserRouter>
      
    )
  }
}
