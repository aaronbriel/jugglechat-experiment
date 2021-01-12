import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {RouteComponentProps} from 'react-router';
import { Link } from 'react-router-dom';
import Header from './Header';

interface IMyComponentProps {
  experimentalGroup: string
}

interface IMyComponentState {
  workerId: string
  evaluationAccuracy: string
  evaluationUsefulness: string
  evaluationSentiment: string
}

export default class Evaluation extends React.Component<IMyComponentProps & RouteComponentProps, IMyComponentState> {

  constructor(props: any) {
    super(props);
    this.state = {
      workerId: (this.props.match.params as any).workerId,
      evaluationAccuracy: "",
      evaluationUsefulness:  "",
      evaluationSentiment:  ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: any) {

    let experimentalGroup = this.props.experimentalGroup
    let workerId = this.state.workerId
    let evaluationSentiment = this.state.evaluationSentiment
    let evaluationAccuracy = this.state.evaluationAccuracy
    let evaluationUsefulness = this.state.evaluationUsefulness

    fetch('/store_evaluation/' + experimentalGroup + '&' + workerId + '&' + evaluationAccuracy + '&' + evaluationUsefulness + '&' + evaluationSentiment)

  }

  render() {
    return (
      <div>
        <Header />
        <div className="evaluation"><h2>Evaluation</h2></div>
        <div className="evaluation">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="evaluationSentiment">
              <Form.Label>What is your overall impression of the chat experience (please be detailed)?</Form.Label>
              <Form.Control as="textarea" rows={3} required onChange={(event) => this.setState({evaluationSentiment: event.target.value})} />
            </Form.Group>
            <Form.Group controlId="evaluationAccuracy">
              <Form.Label>How would you rate the accuracy of the responses (1 to 10)?</Form.Label>
              <Form.Control as="select" required onChange={(event) => this.setState({evaluationAccuracy: event.target.value})} >
                <option></option>
                <option>10</option>
                <option>9</option>
                <option>8</option>
                <option>7</option>
                <option>6</option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="evaluationUsefulness">
              <Form.Label>How would you rate the usefulness of the responses (1 to 10)?</Form.Label>
              <Form.Control as="select" required onChange={(event) => this.setState({evaluationUsefulness: event.target.value})} >
                <option></option>
                <option>10</option>
                <option>9</option>
                <option>8</option>
                <option>7</option>
                <option>6</option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </Form.Control>
            </Form.Group>
            <Button variant="dark" type="submit">
              <Link  onClick={this.handleSubmit} to={`/quiz/${this.state.workerId}`}>Submit and Start Quiz</Link>
            </Button>
          </Form>
          </div>
      </div>
    );
  }
}