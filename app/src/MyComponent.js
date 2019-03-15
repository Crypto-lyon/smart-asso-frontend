import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";

import logo from "./logo.png";

export default ({ accounts }) => (
  <div className="App">
    <div className="section">
      <h2>Organization</h2>
      <p>
        <strong>Stored Value: </strong>
        <ContractData contract="Organization" method="storedData" />
      </p>
      <ContractForm contract="Organization" method="set" />
    </div>
  </div>
);
