import React from 'react';
import './OutputHistory.css';

const OutputHistory = ({ message }) => {
    return(
        <div>
            <div className='aiMessage'>
                AI: {message}
            </div>
        </div>
    );
}

export default OutputHistory;