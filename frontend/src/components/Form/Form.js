import {React , useState } from 'react'
import { Link , useHistory } from 'react-router-dom'

import './Form.css'


function Form(props) {
    const history = useHistory();
    const [title, setTitle] = useState(props.title || "")
    const [text, setText] = useState(props.text || "" )
    const [email, setEmail] = useState(props.email || "" )

    const sumbitChanges = async(e)=>{
        if(text && title && email){
            history.push('/')
        }
        else{
            alert('The generated password has been sent to the provided email id')
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
