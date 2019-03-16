import React, { Component } from "react";

import {
  ContractData,
  ContractForm,
} from "drizzle-react-components";

export class Request extends React.Component {
    state = { name : '', lastname : '' };

    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Organization;
        contract.methods["requestMembership"].cacheSend(this.state.name,this.state.lastname,{from: drizzleState.accounts[0]});
        event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={event => this.setState({name: event.target.value})} />
            Lastname:
            <input type="text" value={this.state.value} onChange={event => this.setState({lastname: event.target.value})} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }