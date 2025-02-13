import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      searchQuery: '' // Add search state
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  // Fetch posts from API
  retrievePosts() {
    axios.get('http://localhost:8000/api/post')
      .then(res => {
        if (res.data.success) {
          this.setState({ posts: res.data.existingPosts });
        }
      })
      .catch(error => {
        console.error("Error retrieving posts:", error);
      });
  }

  // Handle search input change
  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  // Delete post method
  deletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios.delete(`http://localhost:8000/api/post/delete/${id}`)
        .then(res => {
          alert("Post deleted successfully!");
          this.retrievePosts(); // Refresh posts after deletion
        })
        .catch(error => {
          console.error("Error deleting post:", error);
        });
    }
  };

  render() {
    const { posts, searchQuery } = this.state;

    // Filter posts based on search query (case insensitive)
    const filteredPosts = posts.filter((post) =>
      post.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.postCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="container mt-5">
        <h3 className="text-center text-dark mb-4">ALL POSTS</h3>

        {/* Search Input */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by topic, description, or category..."
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
        </div>

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
            {filteredPosts.map((post, index) => (
              <tr key={post._id || index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a href={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
                    {post.topic}
                  </a>
                </td>
                <td>{post.description}</td>
                <td>{post.postCategory}</td>
                <td>
                  <a className='btn btn-warning' href={`/edit/${post._id}`}>
                    <i className='fas fa-edit'></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <button className='btn btn-danger' onClick={() => this.deletePost(post._id)}>
                    <i className='fas fa-trash-alt'></i>&nbsp;Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Create Post Button */}
        <button className='btn btn-success'>
          <a href='/add' style={{ textDecoration: 'none', color: 'white' }}>
            Create New Post
          </a>
        </button>
      </div>
    );
  }
}
