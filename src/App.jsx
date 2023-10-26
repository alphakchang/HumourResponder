import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GpuCard } from 'react-bootstrap-icons';
import Navigation from './components/Navigation/Navigation';
import PromptInput from './components/PromptInput/PromptInput';
import Footer from './components/Footer/Footer';
import AlertMessage from './components/AlertMessage/AlertMessage';
import ApiCall from './components/ApiCall/ApiCall';
import InputHistory from './components/History/InputHistory/InputHistory';
import OutputHistory from './components/History/OutputHistory/OutputHistory';

const initialState = {
  proxy: 'http://localhost:5001',
  prompt: '',
  showAlert: false,
  messages: [
    {"role": "system", "content": "Alphia is a chatbot that turn everything into jokes."}
  ],
  submittedPrompt: ''
}


class App extends Component {

  constructor() {
    super();
    this.state = initialState;
    this.apiCall = React.createRef();
  }

  handleButtonClick = () => {
    if (!this.state.prompt.trim()) {  // Check if prompt is empty
        this.setState({ showAlert: true });  // Show alert if prompt is empty
    } else {
        this.setState(prevState => ({
          submittedPrompt: this.state.prompt,
          showAlert: false,
          messages: [...prevState.messages, {role: 'user', content: this.state.prompt}],
          prompt: ''
      }), () => {
        this.apiCall.current.runCall();
      });
    }
  }

  promptChange = (event) => {
    this.setState({prompt: event.target.value});
  }

  handleApiResponse = (responseContent) => {
    console.log(this.state.messages)
    this.setState(prevState => ({
      messages: [...prevState.messages, {role: 'assistant', content: responseContent}]
    }));
  }
  

  render() {
    return (
      <div>
        <Navigation />
          <div className="container-lg">
            <section id='input'>
              <PromptInput
                handleButtonClick={this.handleButtonClick}
                promptChange={this.promptChange}
                prompt={this.state.prompt}
              />
              <div className='my-2'>
                  {/* Conditionally render the AlertMessage component based on showAlert state */}
                  {this.state.showAlert && <AlertMessage alertText="Please enter your prompt" />}
              </div>
            </section>

            <section id='output'>
              <div className='my-4'>
                {this.state.submittedPrompt
                  ? <>
                      <label htmlFor="promptOutput" className="form-label fw-bold"><GpuCard /> Output</label>
                      <div className='border border-2 rounded-3 p-3'>
                        <InputHistory
                          message={this.state.submittedPrompt}
                        />
                        <OutputHistory
                          message={
                            <ApiCall
                              proxy={this.state.proxy}
                              ref={this.apiCall}
                              prompt={this.state.prompt}
                              messages={this.state.messages}
                              handleApiResponse={this.handleApiResponse}
                            />
                          }
                        />
                      </div>
                    </>
                  : null}
              </div>
            </section>

            <section id='footer'>
              <Footer />
            </section>
          </div>
      </div>
    );
  }
}

export default App;
