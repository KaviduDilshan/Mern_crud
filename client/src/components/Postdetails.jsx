import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Wrapper function to pass hooks to the class component
function PostDetailsWrapper(props) {
  const params = useParams();  // To get route params
  const navigate = useNavigate();  // To navigate programmatically
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
        <h2>Post Details</h2>
        <div className="card p-3 shadow-sm">
          <p><strong>Topic : </strong> {topic}</p>
          <p><strong>Category : </strong> {postCategory}</p>
          <p><strong>Description : </strong> {description}</p>
        </div>
      </div>
    );
  }
}

export default PostDetailsWrapper;
