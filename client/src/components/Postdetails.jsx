import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Wrapper to pass hooks to class component
function PostDetailsWrapper(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <Postdetails {...props} params={params} navigate={navigate} />;
}

class Postdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    axios.get(`http://localhost:8000/api/post/${id}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({ post: res.data.post });
          console.log(this.state.post);
        }
      })
      .catch(error => {
        console.error("Error fetching post details:", error);
      });
  }

  render() {
    const { topic, description, postCategory } = this.state.post;

    return (
      <div className="container mt-4">
        <h3 className="text-center text-dark mb-4">View Post</h3>
        <div className="card shadow-lg p-4 border-0 rounded-3">
          {/* Topic */}
          <div className="mb-3">
            <label className="form-label"><strong>Topic:</strong></label>
            <input 
              className="form-control" 
              value={topic} 
              readOnly 
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label"><strong>Category:</strong></label>
            <input 
              className="form-control" 
              value={postCategory} 
              readOnly 
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label"><strong>Description:</strong></label>
            <textarea 
              className="form-control" 
              rows="5" 
              value={description} 
              readOnly
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PostDetailsWrapper;
