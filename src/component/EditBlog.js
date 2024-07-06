import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "./editBlog.css";
const EditBlog = () => {
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://ken-blogs-data.onrender.com/blogs/${id}`
        );
        setTitle(response.data.title);
        setBody(response.data.body);
        setAuthor(response.data.author);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBlog = { title, body, author };
    try {
      await axios.put(
        `https://ken-blogs-data.onrender.com/blogs/${id}`,
        updatedBlog
      );
      history.push(`/blogs/${id}`);
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };

  return (
    <div className="edit-blog">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Failed to load blog</div>}
      {!isLoading && !isError && (
        <form onSubmit={handleSubmit}>
          <label>Blog title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog body:</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <label>Blog author:</label>
          <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button>Update Blog</button>
        </form>
      )}
    </div>
  );
};

export default EditBlog;
