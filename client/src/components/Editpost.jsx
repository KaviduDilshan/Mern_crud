import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


function EditPostWrapper(props) {
  const params = useParams();  
  const navigate = useNavigate(); 
  return <EditPost {...props} params={params} navigate={navigate} />;
}

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      description: '',
      postCategory: ''
    };
  }

  componentDidMount() {
    const { id } = this.props.params;

    // Fetch the existing post data to populate the form
    axios.get(`http://localhost:8000/api/post/${id}`)
      .then((res) => {
        if (res.data.success) {
          const { topic, description, postCategory } = res.data.post;
          this.setState({ topic, description, postCategory });
        }
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { topic, description, postCategory } = this.state;
    const { id } = this.props.params;

    const updatedPost = { topic, description, postCategory };

    axios.put(`http://localhost:8000/api/post/update/${id}`, updatedPost)
      .then((res) => {
        if (res.data.success) {
          alert('Post updated successfully!');
          this.props.navigate('/');  // Navigate back to all posts
        }
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  render() {
    const { topic, description, postCategory } = this.state;

    return (
      <div className="container mt-5">
        <h3 className="text-center text-dark mb-4">Edit Post</h3>
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
                Update Post
              </button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default EditPostWrapper;

