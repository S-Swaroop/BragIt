//Dependency imports
import {React , useState, useEffect } from 'react'
import queryString from 'query-string'
import { useHistory } from 'react-router-dom'
import ReactModal from 'react-modal'
import axios from 'axios'

//CSS :
import './Edit.css'

function Edit({location}) {
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

    //states : 
    const [title , setTitle] = useState("")
    const [text , setText] = useState("")
    const [blogId, setBlogId] = useState("")
    const [password, setPassword] = useState("")
    const [messageModal , setMessageModal] = useState(false);
    const [message, setMessage] = useState("")

    //Fetching initial data : 
    const currentUrl = location.search ; 
    const uri = `https://bragdrf.pythonanywhere.com` ;
    useEffect(()=>{
        const {id} = queryString.parse(currentUrl)
        setBlogId(id);
        const getData = async(id)=>{
            const data = await axios.get(`${uri}/post/${id}/`).then(res=>res.data)
            setTitle(data.title);
            setText(data.text);
            setPassword(data.password)
        }
        getData(blogId);
    }, [currentUrl, uri, blogId])

    //EventHandlers :
    const submitData= async(e)=>{
        e.preventDefault();
        const resp = await axios.post(`${uri}/post/edit/${blogId}/` , {
            'id': blogId,
            'title': title, 
            'text': text, 
            'password': password
        })
        if(resp.status!==201){
            setMessageModal(true)
            setMessage('Unsuccessful !')
        }else{
            setMessageModal(true)
            setMessage('Changes have been updated successfully !')
        }
        return;
    }

    const deletePost = async(e)=>{
        e.preventDefault() ; 
        const resp = await axios.delete(`${uri}/post/delete/${blogId}/`)
        if(resp.status===200){
            setMessageModal(true);
            setMessage('Post Deleted successfully !')
            return;
        }
    }

    const okGotIt= async(e)=>{
        e.preventDefault(); 
        await setMessageModal(false);
        history.push('/')
    }

    return (
        <>
        <div className="container mt-3">
            <form  >
                <div className="mb-3">
                    <label for="titleInput" className="form-label">Title </label>
                    <input type="text" className="input-title form-control" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                </div>
                <div className="mb-3">
                    <label for="textInput" className="form-label">Text </label>
                    <textarea type="text" className="input-text form-control" value={text} onChange={(e)=>setText(e.target.value)} />
                </div>
            <button className="submit-button btn btn-primary mb-3 mr-100"  onClick={(e)=>deletePost(e)} >Delete Post</button>
            <input type="submit" className="submit-button btn btn-primary mb-3" onClick={(e)=>submitData(e)} />
        </form>
        <div id="custom-modal">
            <ReactModal isOpen={messageModal} style={customStyles} >
                <p>{message}</p>
                <button className="btn btn-primary" onClick={(e)=>okGotIt(e)}>Ok Got it!</button>
            </ReactModal>
        </div>
        
        </div>
        </>
    )
}

export default Edit
