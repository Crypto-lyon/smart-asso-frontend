import React, { Component } from "react";

import {
  ContractData,
  ContractForm,
} from "drizzle-react-components";

import { Request } from './Request'
import { Pending, Status } from './Pending'

import "./App.css";

export class Main extends React.Component   {
  state = { loading: true, drizzleState: null, join : false };
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

    const hasPending = false;
    const l = this.state.drizzleState.transactions.length
    for(let i = 0; i < l; i++) {
      if(this.state.drizzleState.transactions[i].status === "pending") {
        hasPending = true;
      }
    }

    return <div className="App">
      <div className="header">
      <ReadOrga drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}/>
      Current membership status : <Status drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
            account={this.state.drizzleState.accounts[0]}/>
      <JoinButton drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
            account={this.state.drizzleState.accounts[0]} onJoin={event => this.setState({join : true})}/>
        {this.state.join && 
        <Request drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}/>}
        {/*<ContractForm contract="Organization" method="set" />*/}
      </div>
      <div  className="body">
      {hasPending && <label>TRANSACTION PENDING...</label>}
      <label>Members list</label>
      <MembersList drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState} />
      <label>Votes</label>
      <Pending drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}/>
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

class JoinButton extends React.Component {
  state = { dataKey: null, dataKey2: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Organization;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["members"].cacheCall(this.props.account);
    const dataKey2 = contract.methods["accessRequests"].cacheCall(this.props.account);
    
    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey, dataKey2 });
  }

  render() {
    // get the contract state from drizzleState
    const { Organization } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const myString = Organization["members"][this.state.dataKey];
    const myString2 = Organization["accessRequests"][this.state.dataKey2];
    if(!myString || !myString2) {
      return null
    }
    if(!myString.value[3]) {
      if(myString2.value.exists) {
       return <span> (request pending, votes: {myString2.value.acceptedcount})</span>
      } else
      return <button onClick={event => this.props.onJoin()}>Join?</button>
    }
    return null
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
      if(element.event === 'NewMemberAccepted')
        members.push(element.returnValues)
    })

    // using the saved `dataKey`, get the variable we're interested in
   // const data = Organization["getOrganizationInfo"][this.state.dataKey];

    return <div className="memberslist">
    <table>
    <thead>
        <tr>
            <th colSpan="1">Firstname</th>
            <th colSpan="1">Lastname</th>
            <th colSpan="1">Membership status</th>
        </tr>
    </thead>
    <tbody>
         {members.map(member => {
        return <tr key={member.requester}>
            <td>{member.firstName}</td>
            <td>{member.lastName}</td>
            <td><Status drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            account={member.requester}/></td>
        </tr>
         })}
    </tbody>
</table>
    </div>;
  }
}

class App extends Component {
  render() {
    return <Main drizzle={this.props.drizzle}/>
  }
}

export default App;
