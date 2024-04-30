import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const BlogDetails = () => {
    const { id }=useParams();
    const {data:blog, isError, isLoading}=useFetch('https://ken-blogs-data.onrender.com/blogs/'+id);
    const history=useHistory();

    const handleDelete = async () => {
        try{
            axios.delete(`https://ken-blogs-data.onrender.com/blogs/${blog.id}`)
            .then(() => {
                history.push('/');
            });
        } catch(err){
            console.log(`Error:${err.message}`);
        }
      }

    return (  
        <div className="blog-details">
           {isLoading && <div>Loading...</div>}
           {isError && <div>{isError}</div>}
           {blog && (
            <article>
                <h2>{blog.title}</h2>
                <p>Written by {blog.author}</p>
                <div>{blog.body}</div>
                <button onClick={handleDelete}>Delete</button>
            </article>
           )}
        </div>
    );
}
 
export default BlogDetails;