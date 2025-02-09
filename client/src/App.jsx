import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreatePost from './components/Createpost';  // Ensure naming matches file
import EditPost from './components/Editpost';
import PostDetails from './components/Postdetails';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<CreatePost />} />
            <Route path='/edit/:id' element={<EditPost />} />
            <Route path='/post/:id' element={<PostDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
