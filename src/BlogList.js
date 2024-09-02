import { Link } from "react-router-dom";
import './BlogList.css'; // Import the CSS file

const BlogList = ({ blogs, title }) => {
  return (
    <div className="blog-list">
      {title === "All Blogs" && <h2>{title}</h2>} {/* Conditionally render the title */}
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            <div className="blog-content">{blog.content}</div> {/* Add blog content */}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
