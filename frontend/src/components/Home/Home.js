//Dependency Imports:
import {React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import queryString from 'query-string'
import ReactModal from 'react-modal'

//CSS:
import './Home.css'

function Home({location}) {
    const uri = `https://bragdrf.pythonanywhere.com/` ;
    const currentUrl = location.search;
    //States:
    const [blogs , setBlogs] = useState([]);
    const [modal, setModal] = useState(false);

    //Modal component design :
    ReactModal.setAppElement(document.getElementById('custom-modal'))
    const customStyles = {
        content: {
          top: '30%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    //Fetching Data
    useEffect(()=>
    {
        const {search} = queryString.parse(currentUrl)
        if(search===undefined)
        {
            const getData = async()=>{
                const data = await axios.get(`${uri}/`).then(res=>res.data).catch(err=>console.log(err))
                setBlogs([...data])
            }
            
            getData();
        }else{
            const getData = async(q)=>{
                const data = await axios.get(`${uri}/search/${q}/`).then(res=>res.data).catch(err=>console.log(err))
                if(data){
                    setBlogs([...data])
                }
                else{
                    setModal(true);
                }
                console.log(data)
            }
            getData(search)
        }
        
    }, [blogs, uri, currentUrl])

    return (
        <div >
            <div id="custom-modal">
            <ReactModal isOpen={modal} style={customStyles} >
                <h2>No such Blogs</h2>
                <div className="container">
                    <div className="row justify-content-center ">
                        <Link to='/' className="btn btn-outline-success ok-button" onClick={(e)=>{setModal(false)}}>Ok</Link>
                    </div>
                </div>
            </ReactModal>
            </div>
            <ul className="blog-list container mt-4">
                {blogs.map(blog =>
                <div className="container outer my-5">
                    <div className=" card ">
                        <div className="container">
                        <div className="card-title text-dark" ><h1>{blog.title}</h1></div>
                            <div className="card-body text-dark" ><p className="blog-text">{blog.text}</p></div>
                            <Link to={`blogs/?id=${blog.id}/`}><button className="btn btn-outline-success mb-3 ">Read More</button></Link>
                        </div>
                    </div>
                </div>
                )}
            </ul>
        </div>
    )
}

export default Home
