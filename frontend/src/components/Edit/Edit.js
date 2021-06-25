import {React , useState, useEffect } from 'react'
import queryString from 'query-string'
import { useHistory } from 'react-router-dom'

import Form from '../Form/Form'
import axios from 'axios'


function Edit({location}) {
    const history = useHistory();

    const [title , setTitle] = useState("")
    const [text , setText] = useState("")
    const [blogId, setBlogId] = useState("")
    const [password, setPassword] = useState("")

    const currentUrl = location.search ; 
    const uri = `https://bragdrf.pythonanywhere.com` ;
    useEffect(()=>{
        //get data and set form data
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

    const submitData= async(e)=>{
        e.preventDefault();
        const resp = await axios.post(`${uri}/post/edit/${blogId}/` , {
            'id': blogId,
            'title': title, 
            'text': text, 
            'password': password
        })
        if(resp.status===201){
        history.push('/')}
    }

    const deletePost = async(e)=>{
        e.preventDefault() ; 
        const resp = await axios.delete(`${uri}/post/delete/${blogId}/`).then(res=>{history.push('/')}).catch(err=>console.log(err))
    }

    return (
        <div>
            <form >
            <input type="text" className="input title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            <input type="text" className="input text" value={text} onChange={(e)=>setText(e.target.value)} />
            <input type="submit" className="submit-button" onClick={(e)=>submitData(e)} />
        </form>
            <button onClick={(e)=>deletePost(e)} >Delete Post</button>
        </div>
    )
}

export default Edit
