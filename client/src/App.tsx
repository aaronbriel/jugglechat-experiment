import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './pages/Chat';
import Error from './pages/Error'
import Evaluation from './pages/Evaluation';
import GetId from './pages/GetId';
import Instructions from './pages/Instructions';
import Lesson from './pages/Lesson';
import Quiz from './pages/Quiz';
import Thanks from './pages/Thanks';

interface IMyComponentProps {
  experimentalGroup: string
  completionCode: string
}

interface IMyComponentState {
  experimentalGroup: string
  completionCode: string
  workerId: string
}

export default class App extends React.Component<IMyComponentProps, IMyComponentState> {

  constructor(props: any) {
    super(props);
    this.state = {
      experimentalGroup: this.props.experimentalGroup,
      completionCode: this.props.completionCode,
      workerId: 'default'
    }
    this.getId = this.getId.bind(this)
  } 

  getId(getIdCallback: any) {
    this.setState({
        workerId: getIdCallback
    })
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/getid' component={(props: any) => <GetId {...props} experimentalGroup={this.state.experimentalGroup} completionCode={this.state.completionCode} getIdCallback={this.getId} />} />
          <Route exact path ='/error' component={Error} />
          <Switch>
            <Route exact path='/instructions/:workerId' component={(props:any) => <Instructions {...props} experimentalGroup={this.state.experimentalGroup} />} />
            <Route exact path='/chat/:workerId' component={(props:any) => <Chat {...props} experimentalGroup={this.state.experimentalGroup} />} />
            <Route exact path='/evaluation/:workerId' component={(props: any) => <Evaluation {...props} experimentalGroup={this.state.experimentalGroup} />} />
            <Route exact path='/lesson/:workerId' component={(props:any) => <Lesson {...props} experimentalGroup={this.state.experimentalGroup} />} />
            <Route exact path='/quiz/:workerId' component={(props:any) => <Quiz {...props} experimentalGroup={this.state.experimentalGroup} />} />
            <Route exact path='/thanks' component={(props:any) => <Thanks {...props} completionCode={this.state.completionCode} />} />
            <Redirect to={'/getid'}/>
          </Switch>
          <Redirect to={'/getid'}/>
        </Switch>
      </main>
    );

  }
}

