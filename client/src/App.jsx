import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
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
      <div>
        {this.state.posts.map((post, index) => (
          <div key={index}>
            <p>{post.topic}</p>
            <p>{post.description}</p>
            <p>{post.postCategory}</p>
          </div>
        ))}
      </div>
    );
  }
} 
