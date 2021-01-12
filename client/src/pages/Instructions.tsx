import React from 'react';
import Button from 'react-bootstrap/Button';
import {RouteComponentProps} from 'react-router';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header';

interface IMyComponentProps {
  experimentalGroup: string
}

interface IMyComponentState {
  workerId: string
}

export default class Instructions extends React.Component<IMyComponentProps & RouteComponentProps, IMyComponentState> {
  
  constructor(props: any) {
    super(props);

    this.state ={
      workerId: (this.props.match.params as any).workerId
    }

  }

  /**
   * Constructs instructions content based on experimental group
   */
  getContent() {
    if (this.props.experimentalGroup === 'control') {
        return <div>
        <Header/>
        <div className="page-title"><h2>Experiment Instructions</h2></div>
        <p className="page-content">
          Thank you for taking the time to participate in this experiment! You will be presented with a lesson 
          containing information related to Covid-19. 
        </p>
        <p className="page-content">
          After reading over this material you will be given a quiz to test your knowledge. There could be more than one correct 
          answer but you must choose the best one. <i><b>If you browse away from the quiz, it will be invalidated and you will 
          lose your bonus opportunity. It is also timed to 60 seconds, and if you do not finish in that time it will likewise 
          be invalidated and you will lose the bonus.  THIS WILL GO BY FAST SO JUST PICK WHATEVER ANSWERS FEEL BEST.</b></i> 
        </p>
        <div className="page-title">
          <Button variant="dark" href="/lesson">Start Lesson</Button>
        </div>
      </div>
    } else {
      return <div>
      <Header/>
      <div className="page-title"><h2>Experiment Instructions</h2></div>
      <p className="page-content">
        Thank you for taking the time to participate in this experiment! You will be presented with a lesson 
        containing information related to Covid-19. 
      </p>
      {this.getChatInstructions()}
      <p className="page-content">
        You will then be given a multiple-choice quiz to test your knowledge. There could be more than one correct answer but 
        you must choose the best one. Both chatbot responses and quiz questions could contain information beyond that which is 
        presented in the lesson. <i><b>&nbsp;If you browse away from the quiz, it will be invalidated and you will lose your 
        bonus opportunity. It is also timed to 60 seconds, and if you do not finish in that time it will likewise be invalidated 
        and you will lose the bonus. THIS WILL GO BY FAST SO JUST PICK WHATEVER ANSWERS FEEL BEST.</b></i>
      </p> 
      <div className="page-title">
        <Button variant="dark" type="submit">
          <Link to={`/lesson/${this.state.workerId}`}>Start Lesson</Link>
        </Button>
      </div>
    </div>
    }
  }

  /**
   * Constructs instructions content based on chatbot group
   */
  getChatInstructions() {
    if (this.props.experimentalGroup === 'jugglechat') {
      return <p className="page-content">
        After reading over this material you will ask 5 questions to a chatbot related to Covid-19. One of these questions 
        can be a request for a summary of the lesson. You will then be asked to evaluate the chatbot. <i><b>If your evaluation 
        and questions are determined to be authentic you will get a bonus payment.</b></i>
      </p>
    } else {
      return <p className="page-content">
        After reading over this material you will ask 5 questions to a chatbot related to Covid-19. You will then be asked to 
        evaluate the chatbot. <i><b>If your evaluation and questions are determined to be authentic you will get a bonus 
        payment.</b></i>
      </p>
    }  
  }

  render() {
      return this.getContent()
  }

}