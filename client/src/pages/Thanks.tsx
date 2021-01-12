import React from 'react';
import Header from './Header';

interface IMyComponentProps {
  completionCode: string
}

export default class Thanks extends React.Component<IMyComponentProps> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return <div>
    <Header/>
    <div className="evaluation">
      <h2>Thank you for your participation! Here is your experiment completion code: {this.props.completionCode}</h2>
    </div>
    <div className="evaluation">
      <h2>Feel free to close this window now.</h2>
    </div>
    </div>
  }
}