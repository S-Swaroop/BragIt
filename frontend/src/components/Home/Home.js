//Dependency Imports:
import {React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

//CSS:
import './Home.css'

function Home() {
    const uri = `https://bragdrf.pythonanywhere.com/` ;
    
    //States:
    const [blogs , setBlogs] = useState([]);

    //Fetching Data
    useEffect(()=>{
        const getData = async()=>{
            const data = await axios.get(`${uri}`).then(res=>res.data)
            setBlogs([...data]);
        }
        getData() ;
    }, [blogs, uri])

    return (
        <div >
            <ul className="blog-list container mt-4">
                {blogs.map(blog => <div className="card mb-3 ">
                    <div className="card-title" ><h1>{blog.title}</h1></div>
                    <div className="card-body" ><h1>{blog.text}</h1></div>
                    <Link to={`blogs/?id=${blog.id}/`}><p className="btn btn-primary">read more</p></Link>
                </div>)}
            </ul>
        </div>
    )
}

export default Home
