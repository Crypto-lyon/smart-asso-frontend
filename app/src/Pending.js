import React, { Component } from "react";

import {
  ContractData,
} from "drizzle-react-components";

export class Pending extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
       <div>
         <ReadPending drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState} />
        </div>
      );
    }
  }

  class ReadPending extends React.Component {

    componentDidMount() {
      const { drizzle } = this.props;
      const contract = drizzle.contracts.Organization;
    }
  
    render() {
      let votes=[]
      // get the contract state from drizzleState
      const { Organization } = this.props.drizzleState.contracts;
      Organization.events.map(element => {
        console.log(element)
        if(element.event === 'NewMembershipRequest')
        votes.push(element.returnValues)
      })

      // using the saved `dataKey`, get the variable we're interested in
     // const data = Organization["getOrganizationInfo"][this.state.dataKey];
  
      return <div className="voteslist">
      <table>
      <thead>
          <tr>
              <th colSpan="1">Firstname</th>
              <th colSpan="1">Lastname</th>
              <th colSpan="1">Terminated</th>
              <th colSpan="1">Action</th>
          </tr>
      </thead>
      <tbody>
           {votes.map(vote => {
          return <tr key={vote.requester}>
              <td>{vote.firstName}</td>
              <td>{vote.lastName}</td>
              <td><Status drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              account={vote.requester}/></td>
              <td><Action drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              account={vote.requester}/></td>
          </tr>
           })}
      </tbody>
  </table>
      </div>;
    }
  }

  export class Status extends React.Component {
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

  export class Action extends React.Component {
    state = { dataKey: null };
  
    componentDidMount() {
      const { drizzle } = this.props;
      const contract = drizzle.contracts.Organization;
  
      // let drizzle know we want to watch the `myString` method
      const dataKey = contract.methods["members"].cacheCall(this.props.account);
  
      // save the `dataKey` to local component state for later reference
      this.setState({ dataKey });
    }

    vote(address) {
      const { drizzle, drizzleState } = this.props;
      const contract = drizzle.contracts.Organization;
      contract.methods["acceptNewMembership"].cacheSend(address,{from: drizzleState.accounts[0]});
    }
  
    render() {
      // get the contract state from drizzleState
      const { Organization } = this.props.drizzleState.contracts;
  
      // using the saved `dataKey`, get the variable we're interested in
      const myString = Organization["members"][this.state.dataKey];
      if(myString && !myString.value[3]) {
        return <button onClick={event => this.vote(myString.args[0])}>Vote</button>
      } else {
        return null
      }
    }
  }