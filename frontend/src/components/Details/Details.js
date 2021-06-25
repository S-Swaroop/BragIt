import {React, useState, useEffect } from 'react'
import queryString from 'query-string'
import axios from 'axios';
import { Link } from 'react-router-dom'


function Details({location}) {
    const uri = `https://bragdrf.pythonanywhere.com` ;
    const currentUrl = location.search ; 
    const [blogId, setBlogId] = useState("");
    const [blog , setBlog] = useState([]);
    

    useEffect(()=>{
        const {id} = queryString.parse(currentUrl)
        setBlogId(id);
        
        const getBlog = async(id)=>{
            const blog = await axios.get(`${uri}/post/${id}`)
            if(blog.status===404){
                alert(`Blog doesn't exist !`)
                return;
            }else{
                setBlog(blog.data)
                return;
            }
        }
        
        getBlog(blogId) ; 

    }, [currentUrl, blogId, uri])
    return (
        <div>
            <div className="card" >
                <div className="card-title">
                    <h1>{blog.title}</h1>
                </div>
                <div className="card-body">
                    <p>{blog.text}</p>
                </div>
            </div>
            <Link to={`/edit/?id=${blogId}`}><button>edit</button></Link>
        </div>
    )
}

export default Details
