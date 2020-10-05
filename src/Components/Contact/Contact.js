/** Contact Page */
import React, { useContext, useState } from 'react';
import { userContext } from '../../Contexts/userContext';
import { toast, ToastContainer } from 'react-toastify';

import './Contact.css';
import ReportRequests from '../UsersReqs/SupportRequests';
import Footer from '../Footer';

export default function Contact() {

    const { auth } = useContext(userContext);

    const [ report, setReport ] = useState({
        type: 'error',
        title: '',
        subject: '',
        email: ''
    });
    const [ btnText, setBtnText ] = useState('Submit');

    // destructering report object
    const { title, subject, email, type } = report;

    /** onChange event on inputs*/
    const handleOnChange = e => {
        setReport({
            ...report,
            [e.target.name] : e.target.value
        })
    }

    /** onSubmit Event of Form */
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Submit", report);
        setBtnText('Loading');
        try {
            const response = await ReportRequests(report);
            console.log(response);

            if (response.status === 200) {
                // success
                toast.success('Thank You. We will look into it immediately!')
            } else {
                // failed : unexpected request
                toast.error('Something went wrong. Try Again!')
            }
            setBtnText('Submit');
        } catch (error) {
            console.log("error", error);
            toast.error('Something went wrong. Couldn\'t connect to server.');
            setBtnText('Submit');
        }
    }


    return (
        <div className="contactDiv">

            <h3 className="greeting">Hello, what can we help you?</h3>
    
            <form onSubmit={handleOnSubmit}>
            
                <p className="desc">Would you like to report an error or give suggesstions?</p>

                <span className="title"> Report Type </span>
                
                {/* Report Type radion buttons */}
                <div className="radio-group">
                    <div>
                        <input 
                        type="radio" 
                        name="type" 
                        value="error"
                        checked={type === 'error'}
                        onChange={handleOnChange}/>
                        <span className="sub-title">Error</span>
                    </div>
                    <div>
                        <input 
                        type="radio" 
                        name="type" 
                        value="suggestion"
                        checked={type === 'suggestion'}
                        onChange={handleOnChange}/>
                        <span className="sub-title">Suggesstion</span><br/>
                    </div>
                </div>
                
                {/* Report Title */}
                <span className="title">Tittle</span>
                <input 
                className="title-input"
                value={title}
                name="title"
                onChange={handleOnChange}
                required/>

                <span className="title">Subject</span>
                <textarea 
                className="subject"
                value={subject}
                name="subject"
                onChange={handleOnChange}
                required/>

                <span className="title">Email Address</span>
                <input 
                className="title-input"
                name="email"
                value={email}
                onChange={handleOnChange}
                required/>

                <button className="submit-btn">{btnText}</button>

                {/* Toast info message */}
                <ToastContainer/>

                <div className="btm-div">
                    <span>Or contact&nbsp; </span>
                    <span className="contact">support@parse.musicloud-api.site</span>
                </div>
                
            </form>

            <Footer/>
        
        </div>
    )
}