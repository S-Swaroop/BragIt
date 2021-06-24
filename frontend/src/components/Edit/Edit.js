import {React , useState, useEffect } from 'react'
import queryString from 'query-string'

import Form from '../Form/Form'


function Edit() {

    const [title , setTitle] = useState("")
    const [text , setText] = useState("")
    const [email , setEmail] = useState("")


    useEffect(()=>{
        //get data and set form data

        
    })

    return (
        <Form  />
    )
}

export default Edit
