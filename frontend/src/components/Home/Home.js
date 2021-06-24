import {React, useState, useEffect } from 'react'
import axios from 'axios'
import './Home.css'
import { Link } from 'react-router-dom';

function Home() {
    const [blogs , setBlogs] = useState([{
       'id' : 1,
        'title' : "test",
        'text': "testaga;j;"
    }]);
    


    // useEffect(()=>{
    //     const getData = async()=>{
    //         const data = await axios.get(`${uri}/`).then(res=>res.data)
    //         setBlogs([...data]);
    //     }
    //     getData() ;
    // }, [])

    return (
        <div >
            <ul className="blog-list">
                {blogs.map(blog => <div className="card">
                    <div className="card-title" ><h1>{blog.title}</h1></div>
                    <div className="card-body" ><h1>{blog.text}</h1></div>
                    <Link to={`blogs/?id=${blog.id}`}><p>read more</p></Link>
                </div>)}
            </ul>
        </div>
    )
}

export default Home
