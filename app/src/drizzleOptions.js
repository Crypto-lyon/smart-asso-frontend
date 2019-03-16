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
    
    Organization: [{
      eventName: "NewMemberAccepted",
      eventOptions: {
        fromBlock: 0,
      },
    },
    {
      eventName: "NewMembershipRequest",
      eventOptions: {
        fromBlock: 0,
      },
    }
],
  },
};

export default options;
