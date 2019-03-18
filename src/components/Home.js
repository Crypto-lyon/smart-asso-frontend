import React from 'react';
import {
  ContractData,
  ContractForm,
} from "drizzle-react-components";
import { Pending, Status } from '../Pending';
import './Home.css';

class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <h1 className="display-1 title">Smart-asso</h1>
                <p className="lead subtitle">An automated and decentralized management for your association</p>
                <h4 className="display-4">Functionnalities</h4>
                <div className="offset-md-2 col-md8 functionnalities">
                    <dl className="row">
                        <dt className="col-md-3">Membership automation</dt>
                        <dd className="col-md-9">Anyone can emit a request to become a member of the association. Members vote (at majority) to access the request.</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-md-3">Proposal automation</dt>
                        <dd className="col-md-9">Any member can submit a proposal. Members vote (at majority) to apply the proposal.</dd>
                    </dl>
                </div>
            </div>
        );
    }
}

export default Home;
