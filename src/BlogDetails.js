import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
    const { id }=useParams();
    const {data:blog, isError, isLoading}=useFetch('https://ken-blogs-data.onrender.com/blogs/'+id);
    const history=useHistory();

    const handleDelete=()=>{
        fetch('https://ken-blogs-data.onrender.com/blogs/'+blog.id, {
            method:'DELETE'
        }).then(()=>{
            history.push('/');
        })
    }
    return (  
        <div className="blog-details">
           {isLoading && <div>Loading...</div>}
           {isError && <div>{isError}</div>}
           {blog && (
            <artcile>
                <h2>{blog.title}</h2>
                <p>Written by {blog.author}</p>
                <div>{blog.body}</div>
                <button onClick={handleDelete}>Delete</button>
            </artcile>
           )}
        </div>
    );
}
 
export default BlogDetails;