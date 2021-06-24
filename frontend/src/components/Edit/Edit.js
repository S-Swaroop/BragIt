import {React , useState, useEffect } from 'react'
import queryString from 'query-string'

import Form from '../Form/Form'
import axios from 'axios'


function Edit({location}) {

    const [title , setTitle] = useState("")
    const [text , setText] = useState("")
    const [email , setEmail] = useState("")
    const [blogId, setBlogId] = useState("")

    const currentUrl = location.search ; 
    const uri = "" ;
    useEffect(()=>{
        //get data and set form data
        
        const {id} = queryString.parse(currentUrl)
        setBlogId(id);
        const getData = async(id)=>{
            const data = await axios.get(`${uri}/post/${id}`).then(res=>res.data)

            setTitle(data.title);
            setEmail(data.email);
            setText(data.text);
        }

        getData(blogId);
    }, [currentUrl, blogId])

    const deletePost = (e)=>{
        //need to add modal
    }

    return (
        <div>
            <Form title={title} text={text} email={email} id={blogId} />
            <button onClick={(e)=>deletePost(e)} >Delete Post</button>
        </div>
    )
}

export default Edit
