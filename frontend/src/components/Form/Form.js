import axios from 'axios';
import {React , useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import './Form.css'


function Form(props) {
    const history = useHistory();
    const blogId = props.id ;
    const [title, setTitle] = useState(props.title)
    const [text, setText] = useState(props.text )
    const [email, setEmail] = useState(props.email)
    


    const uri = `https://bragdrf.pythonanywhere.com` ;
    const sumbitChanges = async(e)=>{
        e.preventDefault()
        const resp = await axios.post(`${uri}/post/create/`, {
            'title' : title,
            'text': text, 
            'email': email 
        }).then(res=>{console.log(res.status);history.push('/')}).catch(err=>console.log(err))
        
    }

    return (
        <form >
            <input type="text" className="input title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            <input type="text" className="input text" value={text} onChange={(e)=>setText(e.target.value)} />
            <input type="text" className="input email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="submit" className="submit-button" onClick={(e)=>sumbitChanges(e)} />
        </form>
    )
}

export default Form
