import {React, useState, useEffect } from 'react'
import queryString from 'query-string'
// import axios from 'axios';

function Details({location}) {

    const [blogId, setBlogId] = useState();
    // const [blog , setBlog] = useState([]);
    useEffect(()=>{
        const {id} = queryString.parse(location.search)
        setBlogId(id);
        
        // const getBlog = async(BlogId)=>{
        //     const blog = await axios.get(`uri/${id}`)
        //     if(blog.status!==200){
        //         alert(`Blog doesn't exist !`)
        //         return;
        //     }else{
        //         setBlog(blog.data)
        //         return;
        //     }
        // }
        
        // getBlog() ; 


    }, [location.search])
    return (
        <div>
            <h1>{blogId}</h1>
        </div>
    )
}

export default Details
