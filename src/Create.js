import { useState } from "react";
import {useHistory} from 'react-router-dom'

const Create = () => {

    const [title, setTitle]=useState('');
    const [body, setBody]=useState('');
    const [author, setAuthor]=useState('Ken');
    const[isLoading, setisLoading]=useState(false);
    const history=useHistory();

    const handleSubmit=(e)=> {
        e.preventDefault();
        const blog={title, body, author};

        setisLoading(true);
        fetch('https://ken-blogs-data.onrender.com/blogs', {
            method: 'POST',
            headers: {"Content-type":"application/json"},
            body:JSON.stringify(blog)
        }).then(()=>{
            console.log('new blog added');
            setisLoading(false);
            history.push('/');
        })
    }
    return ( 
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                type="text"
                required
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
                <label>Blog body: </label>
                <textarea 
                required
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                />
                <label>Blog Author: </label>
                <input
                type="text"
                required
                maxLength={50}
                value={author}
                onChange={(e)=>setAuthor(e.target.value)}
                />
                {!isLoading && <button>Add Blog</button>}
                {isLoading && <button disabled>Adding...</button>}
            </form>
        </div>   
     );
}
 
export default Create;
