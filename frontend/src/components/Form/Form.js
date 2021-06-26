//dependecy imports : 
import axios from 'axios';
import {React , useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReactModal from 'react-modal'


//CSS :
import './Form.css'


function Form(props) {
    //SATES :
    const history = useHistory();
    const [title, setTitle] = useState(props.title)
    const [text, setText] = useState(props.text )
    const [email, setEmail] = useState(props.email)
    const [isOpen, setIsOpen] = useState(false)
    
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

    const uri = `https://bragdrf.pythonanywhere.com` ;
    
    //EVENT HANDLERS:
    const sumbitChanges = async(e)=>{
        e.preventDefault()
        const resp = await axios.post(`${uri}/post/create/`, {
            'title' : title,
            'text': text, 
            'email': email 
        })
        if(resp.status===201){
            setIsOpen(true);
        }else{
            alert(`Please Enter valid data`)
        }
    }
    const okGotIt= async(e)=>{
        e.preventDefault(); 
        await setIsOpen(false);
        history.push('/')
    }

    return (
        <div className="container" id="custom-modal">
        <ReactModal isOpen={isOpen} style={customStyles} >
            <p>Post Created Successfully !</p>
            <button className="btn btn-primary" onClick={(e)=>okGotIt(e)}>Ok Got it!</button>
        </ReactModal>
            <div className="jumbotron outer mt-5">
                <div className="container mt-2">
                    <div className="row justify-content-center ">
                        <div className="row justify-content-center">
                            <h4 className="text-dark heading my-2 ">Create Thoughts</h4>
                        </div>
                            <div className="container row ">
                                <form >
                                    <div className="form-group mb-3 mt-2">
                                        <input className="form-control" placeholder="example@gmail.com" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input className="form-control" placeholder="Title..." type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <textarea className="form-control"  type="text" value={text} onChange={(e)=>{setText(e.target.value)}} />
                                    </div>
                                    <div className=" row justify-content-center mb-3 mt-4">
                                        <input className="btn btn-outline-success my-2 my-sm-0 custom-button mt-3"  type="submit" onClick={(e)=>sumbitChanges(e)} />
                                    </div>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form
