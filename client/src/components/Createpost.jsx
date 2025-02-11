import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePostWrapper(props) {
  const navigate = useNavigate();
  return <CreatePost {...props} navigate={navigate} />;
}

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      description: '',
      postCategory: ''
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { topic, description, postCategory } = this.state;

    const data = {
      topic,
      description,
      postCategory
    };

    axios.post('http://localhost:8000/api/post/save', data)
      .then((res) => {
        if (res.data.success) {
          alert('Post Created Successfully!');
          this.setState({
            topic: '',
            description: '',
            postCategory: ''
          });
          this.props.navigate('/');  // Redirect to home after successful creation
        }
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  render() {
    return (
      <div className="container mt-5">
        <h3 className="text-center text-dark mb-4">Create New Post</h3>
        <div className="card shadow-lg p-4 border-0 rounded-3">
          <form onSubmit={this.onSubmit}>
            
            {/* Topic Field */}
            <div className="mb-3">
              <label className="form-label"><strong>Topic</strong></label>
              <input 
                type="text" 
                className="form-control" 
                name="topic"
                placeholder="Enter the topic"
                value={this.state.topic}
                onChange={this.handleInputChange}
                required
              />
            </div>

            {/* Description Field */}
            <div className="mb-3">
              <label className="form-label"><strong>Description</strong></label>
              <textarea 
                className="form-control" 
                name="description"
                placeholder="Write your post description here"
                rows="5"
                value={this.state.description}
                onChange={this.handleInputChange}
                required
              ></textarea>
            </div>

            {/* Category Field */}
            <div className="mb-3">
              <label className="form-label"><strong>Category</strong></label>
              <input 
                type="text" 
                className="form-control" 
                name="postCategory"
                placeholder="Enter post category"
                value={this.state.postCategory}
                onChange={this.handleInputChange}
                required
              />
            </div>

            {/* Save Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg">
                Save Post
              </button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default CreatePostWrapper;
