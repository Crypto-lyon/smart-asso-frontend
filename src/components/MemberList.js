import React from 'react';
import {
  ContractData,
  ContractForm,
} from "drizzle-react-components";
import { Pending, Status } from '../Pending';
import './MemberList.css';

class MemberList extends React.Component {

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

        return (
            <div className="row listDiv">
                <div class="offset-md-2 col-md-8">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" colSpan="1">Firstname</th>
                                <th scope="col" colSpan="1">Lastname</th>
                                <th scope="col" colSpan="1">Membership status</th>
                                <th scope="col" colSpan="1">Member Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => {
                                return <tr key={member.requester}>
                                            <td>{member.firstName}</td>
                                            <td>{member.lastName}</td>
                                            <td><Status drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}account={member.requester}/></td>
                                            <td>{member.requester}</td>
                                        </tr>
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MemberList;
