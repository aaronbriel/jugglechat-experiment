import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {RouteComponentProps} from 'react-router';
import { Link } from 'react-router-dom';
import Header from './Header';

interface IMyComponentProps {
    experimentalGroup: string
    completionCode: string
    getIdCallback: any
}

interface IMyComponentState {
    workerId: string
}

export default class GetId extends React.Component<IMyComponentProps & RouteComponentProps, IMyComponentState> {

  constructor(props: any) {
    super(props);
    this.state = {
        workerId: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getId = this.getId.bind(this);
  }

  handleSubmit(event: any) {
    let workerId_ = this.state.workerId
    let completionCode = this.props.completionCode

    fetch('/store_id/' + workerId_ + '&' + completionCode)

    // passing workerId_ back to parent App
    this.props.getIdCallback(workerId_)
  }

  getId(getIdCallback: any) {
    this.setState({
      workerId: getIdCallback
    })
  }


  render() {
    return(
      <div>
        <Header />
        <div className="evaluation">
          <Form>
            <Form.Group controlId="workerId">
              <Form.Label>Please enter your Prolific ID</Form.Label>
              <Form.Control required onChange={(event) => this.setState({workerId: event.target.value})} />
            </Form.Group>
            <Button variant="dark" type="submit">
              <Link onClick={this.handleSubmit} to={`/instructions/${this.state.workerId}`}>Submit</Link>
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}