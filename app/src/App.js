import React, { Component } from "react";
import {
  ContractData,
  ContractForm,
} from "drizzle-react-components";

import "./App.css";

export class Main extends React.Component   {
  state = { loading: true, drizzleState: null };
  constructor(props, context) {
    super(props);
  }

  componentDidMount() {
    const { drizzle } = this.props; 
    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    const { drizzle } = this.props;
    return <div className="App">
      <div className="header">
      <ReadOrga drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}/>
      Current membership status : <Status drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
            account={this.state.drizzleState.accounts[0]}/>
        {/*<ContractForm contract="Organization" method="set" />*/}
      </div>
      <div  className="body">
      <ReadString method="getMembersCount" drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}/>
      <MembersList drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState} />
      </div>
      <div  className="footer">
      
      </div>
  </div>;
  }
}

class ReadString extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Organization;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods[this.props.method].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { Organization } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const myString = Organization[this.props.method][this.state.dataKey];

    // if it exists, then we display its value
    return <p>My stored string: {myString && myString.value}</p>;
  }
}

class Status extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Organization;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["members"].cacheCall(this.props.account);

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { Organization } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const myString = Organization["members"][this.state.dataKey];

    // if it exists, then we display its value
    return <span>{myString && myString.value[3]? 'yes' : 'no'}</span>;
  }
}

class ReadOrga extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Organization;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["getOrganizationInfo"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { Organization } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const data = Organization["getOrganizationInfo"][this.state.dataKey];

    // if it exists, then we display its value
    if(!data)
    return <p>loading...</p>
    return <div className="orga">
      <h2>{data.value[0]}</h2><br/>
      <label>Url : {data.value[2]}</label><br/>
      <label>Members count : {data.value[3]}</label><br/>
    </div>;
  }
}

class MembersList extends React.Component {

  componentDidMount() {
  }

  render() {
    let members=[]
    // get the contract state from drizzleState
    const { Organization } = this.props.drizzleState.contracts;
    Organization.events.map(element => {
      members.push(element.returnValues)
    })

    // using the saved `dataKey`, get the variable we're interested in
   // const data = Organization["getOrganizationInfo"][this.state.dataKey];

    return <div className="memberslist">
    <ul>
      {members.map(member => {
        return <li key={member.requester}>
        <label>{member.firstName} {member.lastName} </label>
        Current membership status : <Status drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            account={member.requester}/>
        </li>
      })}
    </ul>
    </div>;
  }
}

class App extends Component {
  render() {
    return <Main drizzle={this.props.drizzle}/>
  }
}

export default App;
