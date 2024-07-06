import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogList from './BlogList';

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://ken-blogs-data.onrender.com/blogs/");
        setBlogs(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsError(`Error: ${err.message}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      {isError && <div>{isError}</div>}
      {isLoading && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
};

export default Home;
