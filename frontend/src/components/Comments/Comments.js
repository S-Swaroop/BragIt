import axios from 'axios';
import {React, useState, useEffect } from 'react'

function Comments({id}) {

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const blogId = id; 

    const uri = `https://bragdrf.pythonanywhere.com` ;

    useEffect(() => {

        const getComments = async()=>{
            const data = await axios.get(`${uri}/post/comment/${blogId}/`).then(res=>setComments([...res.data])).catch(err=>console.log(err))
            
            
        }
        getComments(blogId)
    }, [comments, uri, blogId])

    const sumbitComment = async(e)=>{   
        e.preventDefault();
        const data = await axios.post(`${uri}/post/comment/${blogId}/`, {
            'comment': comment
        }).then(res=>setComments([...res.data])).catch(err=>console.log(err))
        ;
    }

    return (
        <div className="container">
            <form >
                <input type="text" value={comment} onChange={(e)=>{setComment(e.target.value)}} />
                <input type="submit" onClick={(e)=>sumbitComment(e)} /> 
            </form>
            <div className="container">
                {comments.map(comm =><p>{comm.comment}</p>)}
            </div>
        </div>
    )
}

export default Comments
