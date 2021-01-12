import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {RouteComponentProps} from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import Timer from 'react-compound-timer';
import Header from './Header';

interface IMyComponentProps {
  experimentalGroup: string
}

interface IMyComponentState {
  workerId: string
  quizAnswer1: string
  quizAnswer2: string
  quizAnswer3: string
  quizAnswer4: string
  quizAnswer5: string
  redirect: boolean
}

export default class Quiz extends React.Component<IMyComponentProps & RouteComponentProps, IMyComponentState> {

  constructor(props: any) {
    super(props);

    this.state = {
      workerId: (this.props.match.params as any).workerId,
      quizAnswer1: "",
      quizAnswer2: "",
      quizAnswer3: "",
      quizAnswer4: "",
      quizAnswer5: "",
      redirect: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event: any) {

    let experimentalGroup = this.props.experimentalGroup
    let workerId = this.state.workerId
    let quizAnswer1 = this.state.quizAnswer1
    let quizAnswer2 = this.state.quizAnswer2
    let quizAnswer3 = this.state.quizAnswer3
    let quizAnswer4 = this.state.quizAnswer4
    let quizAnswer5 = this.state.quizAnswer5
    
    fetch('/store_quiz/' + experimentalGroup  + '&' + workerId   + '&' + quizAnswer1 + '&' + quizAnswer2 + '&' + quizAnswer3 + '&' + quizAnswer4 + '&' + quizAnswer5)

  }

  render() {
    if (this.state.redirect) return <Redirect to='/thanks' />;
    else return (
      <div>
        <Header />
        <div className="evaluation"><h2>Quiz</h2></div>
        <div className="evaluation"><p><b>Do not browse away! Your time is limited so pick answers quickly!</b></p></div>
        <div className="evaluation">
          <Timer
            initialTime={60000}
            lastUnit="s"
            direction="backward"
            checkpoints={[
              {
                time: 0,
                callback: () => this.setState({redirect: true}),
                }
            ]}
          >
            {() => (
                <React.Fragment>
                    <Timer.Seconds /> seconds remaining...
                </React.Fragment>
            )}
          </Timer>
        </div>
        <div className="evaluation">
          <Form>
            <Form.Group controlId="quizQuestion1">
              <Form.Label>What is the average incubation period?</Form.Label>
              <Form.Control as="select" required onChange={(event) => this.setState({quizAnswer1: event.target.value.charAt(0)})} >
                <option></option>
                <option>1. 2 days</option>
                <option>2. 5 days</option>
                <option>3. 7 days</option>
                <option>4. 14 days</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="quizQuestion2">
              <Form.Label>How is Covid-19 primarily transmitted?</Form.Label>
              <Form.Control as="select" required onChange={(event) => this.setState({quizAnswer2: event.target.value.charAt(0)})} >
                <option></option>
                <option>1. Bats</option>
                <option>2. Person to person</option>
                <option>3. Respitory droplets</option>
                <option>4. Surfaces</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="quizQuestion3">
              <Form.Label>What underlying medical condition makes people at risk the least?</Form.Label>
              <Form.Control as="select" required onChange={(event) => this.setState({quizAnswer3: event.target.value.charAt(0)})} >
                <option></option>
                <option>1. Diabetes</option>
                <option>2. Heart disease</option>
                <option>3. Obesity</option>
                <option>4. Lung disease</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="quizQuestion4">
              <Form.Label>What is IPC?</Form.Label>
              <Form.Control as="select" required onChange={(event) => this.setState({quizAnswer4: event.target.value.charAt(0)})} >
                <option></option>
                <option>1. International Panel on Control of Infectiuos Diseases</option>
                <option>2. Internal PPE count</option>
                <option>3. Infection Prevention Council</option>
                <option>4. Infection prevention and control</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="quizQuestion5">
              <Form.Label>What is the difference between COVID-19 and SARS-CoV-2?</Form.Label>
              <Form.Control as="select" required onChange={(event) => this.setState({quizAnswer5: event.target.value.charAt(0)})} >
                <option></option>
                <option>1. SARS-CoV-2 is an earlier form of the virus</option>
                <option>2. COVID-19 is caused by SARS-CoV-2</option>
                <option>3. SARS-CoV 2 is used in medical journals to describe COVID-19</option>
                <option>4. They are two terms that describe the same virus</option>
              </Form.Control>
            </Form.Group>
            <Button variant="dark" type="submit">
              <Link  onClick={this.handleSubmit} to="/thanks">Submit</Link>
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}