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
        // <div id="custom-modal" className="container">
        <>
        <div id="custom-modal">
            <ReactModal isOpen={isOpen} style={customStyles}>
                <i onClick={()=>setIsOpen(false)}  class="fa fa-times-circle cross"></i>
                <h4 className="small">Enter Password : </h4>
                <input className="form-control form-control-sm" type="password" value={pass} onChange={(e)=>setPass(e.target.value)} onKeyPress={(e)=>e.key==='Enter'? checkPass(e) : null} />
            </ReactModal>
        </div>
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="card">
                        <div className="card-title">
                            <h1>{blog.title}</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <p className="text-body">{blog.text}</p>
                            </div>
                            <div className="row">
                                <div className="col-10"></div>
                                <div className="col-2">
                                    <button className="btn btn-outline-success" onClick={(e)=>setIsOpen(true)} >Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="col-12">
                    <Comments id={blog.id} />
                </div>
            </div>
        </div>
        </>
    )
}

export default Details
