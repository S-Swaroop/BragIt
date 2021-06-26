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
            {/* <form >
                <input type="text" className="input title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                <input type="text" className="input text" value={text} onChange={(e)=>setText(e.target.value)} />
                <input type="text" className="input email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="submit" className="submit-button" onClick={(e)=>sumbitChanges(e)} />
            </form> */}
            <div className="jumbotron">
                <div className="container">
                    <div className="form-group">
                        <input type="text" className="input title form-control" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                    </div>
                    <div class="form-group">
                        <textarea type="text" className="input text form-control" value={text} onChange={(e)=>setText(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="input email form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="submit-button form-control" onClick={(e)=>sumbitChanges(e)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form
