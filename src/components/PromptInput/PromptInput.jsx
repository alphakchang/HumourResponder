import React, { useRef, useEffect } from 'react';
import './PromptInput.css';
import SendPromptButton from '../SendPromptButton/SendPromptButton';
import { ChatLeftDots, QuestionCircle } from 'react-bootstrap-icons';

const PromptInput = ({ promptChange, handleButtonClick, prompt }) => {
    
    const textAreaRef = useRef(null);

    const updateTextAreaHeight = () => {
        const textArea = textAreaRef.current;
        // Reset the height to 'auto' to shrink the textarea if necessary
        textArea.style.height = 'auto';
        // Set the height to match the content
        textArea.style.height = `${textArea.scrollHeight}px`;
    };

    const handleKeyDown = (event) => {
        if(event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleButtonClick();
        }
    };

    const handleChange = (event) => {
        promptChange(event);
        updateTextAreaHeight();
    };

    useEffect(() => {
        // Update the height initially in case there is initial content
        updateTextAreaHeight();
    }, []);

    return(
        <div>
            <div>
                <label htmlFor="promptText" className="form-label fw-bold"><ChatLeftDots /> Prompt</label>
                <div className="my-1 input-group">
                    <textarea
                        ref={textAreaRef}
                        type="text"
                        className="form-control"
                        id="promptText"
                        placeholder="e.g. Give me a 3 month exercise plan"
                        value={prompt}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    ></textarea>
                    <span className='mx-1 send-button'>
                        <SendPromptButton buttonName="Go" onClick={handleButtonClick} />
                    </span>
                    {/* <!-- tooltip --> */}
                    <span className="input-group-text">
                        <span className="tt" data-bs-placement="bottom" title="Type what you want the AI to do, the AI will look above for some context if there is any.">
                            <QuestionCircle />
                        </span>
                    </span>
                </div>

            </div>
        </div>
    );
}

export default PromptInput;