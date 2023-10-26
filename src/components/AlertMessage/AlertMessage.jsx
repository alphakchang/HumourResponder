import React from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertMessage = ({ alertText }) => {
    const [show, setShow] = React.useState(true);
    
    return(
        <Alert show={show} variant="warning" onClose={() => setShow(false)} dismissible>
            <strong>{alertText}</strong>
        </Alert>
    );
}

export default AlertMessage;