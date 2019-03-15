import Organization from "./artifacts/Organization.json"

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
  contracts: [Organization],
  events: {
    Organization: ["Organization"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
