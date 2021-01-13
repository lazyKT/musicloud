/** Contact Page */
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import './Contact.css';
import ReportRequests from '../UsersReqs/SupportRequests';
import { validate, Messages } from '../RegisterValidation';
import { useCookies } from '../Hooks/useCookies';
import Footer from '../Footer';
import { withRouter } from 'react-router-dom';


/** Contact Page: Report Issues and Feedback */
function Contact() {

    const { login, cookies } = useCookies();

    const [ report, setReport ] = useState({
        type: 'error',
        title: '',
        subject: '',
        email: ''
    });
    const [ btnText, setBtnText ] = useState('Submit');
    const [ error, setError ] = useState(true);
    const [ subjectError, setSubjectError ] = useState(null);

    // destructering report object
    const { title, subject, email, type } = report;

    /** onChange event on inputs*/
    const handleOnChange = e => {

        if (e.target.name === 'email' && validate('email', e.target.value)) {
            // go through validation
            console.log("email", e.target.value);
            setError(false);
        }

        setReport({
            ...report,
            [e.target.name] : e.target.value
        })
    }


    const formValidation = value => {
        return value.split(" ").length < 5;
    }


    /** onSubmit Event of Form */
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { title, type, subject} = report;
        const email = login ? cookies.email : report.email;
        

        if (formValidation(subject)) {
            setSubjectError("Subject must contain at least 5 words!");
            return;
        }
        
        setBtnText('Loading');
        try {
            const response = await ReportRequests(email, title, subject, type);

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
        setSubjectError(null);
    }


    return (
        <div className="contactDiv">

            <h3 className="greeting">Hello, what can we help you?</h3>
            {
                error
            }
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
                placeholder="Eg. Need to Improve UI!"
                required/>

                {/* report subject */}
                <span className="title">Subject</span>
                <span className="error">
                    { subjectError && `${subjectError}*` }
                </span>
                <textarea 
                className="subject"
                value={subject}
                name="subject"
                onChange={handleOnChange}
                placeholder="Eg. Website Design is so boring!"
                required/>

                {/* email address */}
                { !login && 
                    (<div>
                        <span className="title">Email Address</span>
                        <span className="error">
                            { (!validate('email', email) && email) && 
                                `${Messages['email']} *`
                            }
                        </span>
                        <input 
                        className="title-input"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="1234@example.com"
                        required/>
                    </div>)
                }

                <button className="submit-btn">{btnText}</button>

                {/* Toast info message */}
                <ToastContainer/>

                {/* <div className="btm-div">
                    <span>Or contact&nbsp; </span>
                    <span className="contact">support@parse.musicloud-api.site</span>
                </div> */}
                
            </form>

            {/* <Footer/> */}
        
        </div>
    )
}

export default withRouter(Contact);