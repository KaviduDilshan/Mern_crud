import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  // Correctly named method
  retrievePosts() {
    axios.get('http://localhost:8000/api/post')
      .then(res => {
        if (res.data.success) {
          this.setState({ posts: res.data.existingPosts }, () => {
            console.log(this.state.posts);
          });
        }
      })
      .catch(error => {
        console.error("Error retrieving posts:", error);
      });
  }

  render() {
    return (
      <div className="container mt-5">
        <h3 className="text-center text-dark mb-4">ALL POST</h3>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Topic</th>
              <th scope="col">Description</th>
              <th scope="col">Post Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post, index) => (
              <tr key={post._id || index}>
                <th scope="row">{index + 1}</th>
                <td>
                    <a href={`/post/${post._id}`} 
                    style={{ textDecoration: 'none' }}>
                    {post.topic}
                    </a>
                </td>
                <td>{post.description}</td>
                <td>{post.postCategory}</td>
                <td>
                  <a className='btn btn-warning' href='#'>
                    <i className='fas fa-edit'></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a className='btn btn-danger' href='#'>
                    <i className='fas fa-trash-alt'></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='btn btn-success'>
         <a href='/add' style={{ textDecoration: 'none', color: 'white' }}>
         Create New Post
        </a>
        </button>


        {/* <p>All Posts</p>
        {this.state.posts.map((post, index) => (
          <div key={index}>
            <p>{post.topic}</p>
            <p>{post.description}</p>
            <p>{post.postCategory}</p>
          </div>
        ))} */}
      </div>
    );
  }
} 
