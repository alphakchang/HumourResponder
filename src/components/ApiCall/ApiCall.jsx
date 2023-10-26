import React, { Component } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true // Note to self: bring this to the backend at some point
});

const textToHtml = (text) => {
    return text.split('\n').map((str, index, array) => (
        <React.Fragment key={index}>
            {str}
            {index === array.length - 1 ? null : <br />}
        </React.Fragment>
    ));
}


class ApiCall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: ''
        }
    }

    buildFinalPrompt() {
        const finalPrompt = this.props.prompt;
        return finalPrompt;
    }

    async callApi() {
        const completion = await openai.chat.completions.create({
            model: "ft:gpt-3.5-turbo-0613:personal::7xZUDvgW",
            messages: this.props.messages,
            stream: true,
            temperature: 0.2
        });
    
        let responseContent = '';
        for await (const chunk of completion) {
            if (chunk.choices && chunk.choices[0].delta && chunk.choices[0].delta.content) {
                this.setState({ response: responseContent += chunk.choices[0].delta.content });
            }
        }
        
    }

    runCall() {
        this.callApi().then(() => {
          this.props.handleApiResponse(this.state.response); // use the prop here
          console.log(this.state.response);
        });
      }
      

    render() {
        return (
            <span>
                {textToHtml(this.state.response)}
            </span>
        );
    }
}

export default ApiCall;