import Button from 'react-bootstrap/Button';
import React from 'react';
import {RouteComponentProps} from 'react-router';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Widget, addResponseMessage, toggleWidget, deleteMessages } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './chat.css';
import Header from './Header';
import logo from '../images/chatbot_allocator.png';

interface IMyComponentProps {
  experimentalGroup: string
}

interface IMyComponentState {
  workerId: string,
  questionCount: number
}

export default class Chat extends React.Component<IMyComponentProps & RouteComponentProps, IMyComponentState> {

  constructor(props: any) {
    super(props);

    this.state = {
      workerId: (this.props.match.params as any).workerId,
      questionCount: 1
    }

    this.handleNewUserMessage = this.handleNewUserMessage.bind(this)
    this.getContent = this.getContent.bind(this)

    toggleWidget()
    addResponseMessage(
      'Hello! You are allowed 5 questions. After 5 questions type any text and press enter. Be sure to study the answers! :)'
    );
  }

  /**
   * Triggered when new message received from user. Calls route to get response
   * from JuggleChat then sets state variables based on response
   * @function
   */
  handleNewUserMessage = async (newMessage: string) => {
    if (this.state.questionCount <= 5) {
      addResponseMessage("Thinking...", "responseWaiter")
      const response = await fetch('/get_response/' + this.props.experimentalGroup + '&' + this.state.workerId + '&' + newMessage) 
      const res = await response.json();
      const chatbotResponse = res.result[0]
      deleteMessages(0, "responseWaiter")
      addResponseMessage(chatbotResponse)
    }

    this.setState({
      questionCount: this.state.questionCount + 1
    })

  };

  /**
   * Disables widget and adds "Ready for Quiz" button once question count reaches 6
   * @function
   * @param {string} questionCount - Question number asked
   */
  getContent(questionCount: number) {
    if (questionCount <= 6) {
        return <Widget 
        handleNewUserMessage={this.handleNewUserMessage}
        profileAvatar={logo}
        title="Chat Interface"
        subtitle=""
        />
    } else {
      return <div>
        <p>Click the button below to when you are ready.</p>
        <Button variant="dark" type="submit">
          <Link to={`/evaluation/${this.state.workerId}`}>Start Evaluation</Link>
        </Button>
      </div>
    }
  }

  render() {
      return (
        <div>
          <Header/>
          <div className="component">
            {this.getContent(this.state.questionCount)}
          </div>
        </div>
      )
  }

}