import axios from 'axios';
import {React , useState } from 'react'
import { useHistory } from 'react-router-dom'

import './Form.css'


function Form(props) {
    const history = useHistory();
    const blogId = props.id || "" ; 
    const [title, setTitle] = useState(props.title || "")
    const [text, setText] = useState(props.text || "" )
    const [email, setEmail] = useState(props.email || "" )
    const password = useState(props.password || "" );

    const uri = "" ;
    const sumbitChanges = async(e)=>{
        var resp= 500 ;
        if(blogId!==""){
            resp = await axios.post(`${uri}/post/edit/${blogId}` , {
                'id': blogId,
                'title': title, 
                'text': text, 
                'email': email,
                'password': password
            })
        }else{
            resp = await axios.post(`${uri}/post/create` , {
                'title': title, 
                'text': text, 
                'email': email
            })
        }

        if(resp.status===201){
            alert('The generated password has been sent to the provided email id')
            history.push('/')
        }
        else{
            alert('shit')
        }
    }

    return (
        <form >
            <input type="text" className="input title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type="text" className="input text" value={text} onChange={(e)=>setText(e.target.value)} />
            <input type="text" className="input email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="submit" className="submit-button" onClick={(e)=>sumbitChanges(e)} />
        </form>
    )
}

export default Form
