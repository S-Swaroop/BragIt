import axios from 'axios';
import {React, useState, useEffect } from 'react'

//CSS:
import './Comments.css'

function Comments({id}) {

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const blogId = id; 

    const uri = `https://bragdrf.pythonanywhere.com` ;

    useEffect(() => {

        const getComments = async()=>{
            const data = await axios.get(`${uri}/post/comment/${blogId}/`).then(res=>setComments([...res.data])).catch(err=>console.log(err))
            console.log(data)
            
        }
        getComments(blogId)
    }, [comments, uri, blogId])

    const sumbitComment = async(e)=>{   
        e.preventDefault();
        const data = await axios.post(`${uri}/post/comment/${blogId}/`, {
            'comment': comment
        }).then(res=>setComments([...res.data])).catch(err=>console.log(err))
        ;
        console.log(data)
    }

    return (
        <div className="container">
            <form className="container row justify-content-center" >
            <div className="col-2"></div>
                <div className="col-8 justify-content-center">
                    <input className="form-control" placeholder="comment...." type="text" value={comment} onChange={(e)=>{setComment(e.target.value)}} onKeyPress={(e)=>e.key==="Enter"?sumbitComment(e):null} />
                </div>
                <div className="col-2 justify-content-center">
                    <i className="fa fa-paper-plane plane" onClick={(e)=>sumbitComment(e)} />
                </div>
            </form>
            <div className="container ">
                <div className="row justify-content-center">
                    {comments.map(comm =><div className="row mt-3">
                                                <div className="col-2"></div>
                                                <div className="col-8 mt-2 comment card"><div className="card-body"><p>{comm.comment}</p></div></div>
                                                <div className="col-2"></div>
                                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Comments
