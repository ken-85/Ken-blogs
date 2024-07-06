import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://ken-blogs-data.onrender.com/blogs/${id}`);
        setBlog(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsError(`Error: ${err.message}`);
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://ken-blogs-data.onrender.com/blogs/${id}`);
      history.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="blog-details">
      {isLoading && <div>Loading...</div>}
      {isError && <div>{isError}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <div className="blog_button">
            <Link to={`/edit/${blog.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
