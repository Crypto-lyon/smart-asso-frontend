import { Main } from "./MyComponent";
import { drizzleConnect } from "drizzle-react";

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    Organization: state.contracts.Organization
  };
};

const MyContainer = drizzleConnect(Main, mapStateToProps);

export default MyContainer;
