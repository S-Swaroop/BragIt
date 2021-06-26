//Dependency imports:
import {React, useState, useEffect } from 'react'
import queryString from 'query-string'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import ReactModal from 'react-modal'
import "./Details.css"

//Component imports : 
import Comments from '../Comments/Comments';

function Details({location}) {
    const history = useHistory();

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

    //States :
    const uri = `https://bragdrf.pythonanywhere.com` ;
    const currentUrl = location.search ; 
    const [blogId, setBlogId] = useState("");
    const [blog , setBlog] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [pass, setPass] = useState("")

    //Fetching Data : 
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

    //Event Handlers :
    const checkPass = (e)=>{
        e.preventDefault();
        if(e.target.value== blog.password){
            history.push(`/edit/?id=${blog.id}`)
        }else{
            alert(`incorrect password`)
        }
    }
    
    return (
        <div id="custom-modal" className="container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="container">
                        <div className="card outer" >
                            <div className="card-title">
                                <h1>{blog.title}</h1>
                            </div>
                            <div className="card-body">
                                <p>{blog.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Comments id={blogId} />
                        <button onClick={()=>setIsOpen(!isOpen)}>Edit</button>
                        <ReactModal isOpen={isOpen} style={customStyles}>
                            <h4>Enter Password : </h4>
                            <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} onKeyPress={(e)=>e.key==='Enter'? checkPass(e) : null} />
                        </ReactModal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
