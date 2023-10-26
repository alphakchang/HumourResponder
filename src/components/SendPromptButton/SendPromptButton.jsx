import React, { Component } from 'react';

class SendPromptButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonName: props.buttonName,
        }
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.props.onClick}>{this.state.buttonName}</button>
            </div>
        );
    }
}

export default SendPromptButton;

