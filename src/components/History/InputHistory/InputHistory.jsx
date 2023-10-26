import React from 'react';
import './InputHistory.css';

const InputHistory = ({ message }) => {
    return(
        <div>
            <div className='userMessage'>
                You: {message}
            </div>
            <br />
            <br />
        </div>
    );
}

export default InputHistory;