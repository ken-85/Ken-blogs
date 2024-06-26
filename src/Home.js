import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {

  const{data:blogs, isLoading, isError}=useFetch('https://ken-blogs-data.onrender.com/blogs');
    
  return (  
      <div className="home">
        {isError && <div>{isError}</div>}
        {isLoading && <div>Loading...</div>}
        {blogs && <BlogList blogs={blogs} title="All Blogs" />}
      </div>  
  );
}
 
export default Home;