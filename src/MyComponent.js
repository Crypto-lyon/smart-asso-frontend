import React from "react";
import {
  ContractData,
  ContractForm,
} from "drizzle-react-components";

export class Main extends React.Component   {
  constructor(props, context) {
    super(props);
    console.log('plop', context)
}

  render() {
    return <div className="App">
    <div className="section">
      <h2>Organization</h2>
        <strong>Stored Value: </strong>
        <ContractData contract="Organization" method="getOrganizationInfo" />
        <ContractData contract="Organization" method="getMembersCount" />
       {this.dataKey && this.datakey.firstname}
      {/*<ContractForm contract="Organization" method="set" />*/}
    </div>
  </div>;
  }
}
