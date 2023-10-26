import React, { useState } from 'react';
import './TermExtraction.css';
import SendPromptButton from '../SendPromptButton/SendPromptButton';
import ApiCall from '../ApiCall/ApiCall';
import { QuestionCircle } from 'react-bootstrap-icons';
import AlertMessage from '../AlertMessage/AlertMessage';

const prompt = "Extract between 1 and 15 impactful terms from the following text, add a number before each term: "

const TermExtraction = ({ content }) => {
    const apiCall = React.createRef();
    const [showAlert, setShowAlert] = useState(false);

    const handleButtonClick = () => {
        if (!content.trim()) {  // Check if content is empty
            setShowAlert(true);  // Show alert if content is empty
        } else {
            apiCall.current.runCall();  // Else, make the API call
            setShowAlert(false);  // Hide alert if previously shown
        }
    }

    return (
        <div className="col-lg-4 col-md-4 col-12 my-1">
            
            <div className="row my-2">
                <div className="d-grid d-flex justify-content-between">
                    <SendPromptButton buttonName="Extract Key Terms" onClick={handleButtonClick} />
                    {/* <!-- tooltip --> */}
                    <span className="input-group-text">
                        <span className="tt" data-bs-placement="bottom" title="Click Extract Key Terms to see the key terms of the source text">
                            <QuestionCircle />
                        </span>
                    </span>
                </div>
            </div>
            <div className="termArea py-2 px-3 rounded">
                <ApiCall ref={apiCall} content={content} prompt={prompt}/>
            </div>

            <div className='my-2'>
                {/* Conditionally render the AlertMessage component based on showAlert state */}
                {showAlert && <AlertMessage alertText="Please enter text in source" />}
            </div>
        </div>
    );
}

export default TermExtraction;