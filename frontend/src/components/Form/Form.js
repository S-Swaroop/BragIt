import {React , useState } from 'react'
import { Link } from 'react-router-dom'

import './Form.css'


function Form(props) {
    const [title, setTitle] = useState(props.title || "")
    const [text, setText] = useState(props.text || "" )
    const [email, setEmail] = useState(props.email || "" )

    const sumbitChanges = async(e)=>{
        
    }

    return (
        <form >
            <input type="text" className="input title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type="text" className="input text" value={text} onChange={(e)=>setText(e.target.value)} />
            <input type="text" className="input email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Link to={'/'}><input type="submit" className="submit-button" onClick={(e)=>sumbitChanges(e)} /></Link>
        </form>
    )
}

export default Form
