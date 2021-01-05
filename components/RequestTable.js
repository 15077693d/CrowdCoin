import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3'
import campaign from '../ethereum/campaign'
const RequestTable = ({ address, requests }) => {
    const handleApprove = async (id) => {
        const accounts = await web3.eth.getAccounts()
        const account = accounts[0]
        console.log(id)
        await campaign(address).methods.approveRequest(id).send({
            from: account
        }).on('error', (error) => {
            console.log(error)
        }).on('transactionHash', (transactionHash) => {
            console.log(transactionHash)
        })
    }
    const handleFinalize = async (id) => {
        const accounts = await web3.eth.getAccounts()
        const account = accounts[0]
        await campaign(address).methods.finalizeRequest(id).send({
            from: account
        }).on('error', (error) => {
            console.log(error)
        }).on('transactionHash', (transactionHash) => {
            console.log(transactionHash)
        })
    }
    const requestNode = requests.map((request, i) => {
        const [name, description, value, recipient, complete, approvalCount, approverTotalCount] = Object.values(request)
        return <Table.Row key={i} disabled={complete == true} positive={approvalCount >= approverTotalCount}>
            <Table.Cell>{i}</Table.Cell>
            <Table.Cell>{description}</Table.Cell>
            <Table.Cell>{web3.utils.fromWei(value, 'ether')}</Table.Cell>
            <Table.Cell>{recipient}</Table.Cell>
            <Table.Cell>{approvalCount}/{approverTotalCount}</Table.Cell>
            {
                complete != true ? <Table.Cell><Button onClick={() => handleApprove(i)} basic color="green">Approve</Button></Table.Cell> : <Table.Cell></Table.Cell>
            }
            {
                complete != true ? <Table.Cell><Button onClick={() => handleFinalize(i)} basic color="teal">Finalize</Button></Table.Cell> : <Table.Cell></Table.Cell>
            }
        </Table.Row>
    })
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Recipient</Table.HeaderCell>
                    <Table.HeaderCell>ApprovalCount</Table.HeaderCell>
                    <Table.HeaderCell>Approve</Table.HeaderCell>
                    <Table.HeaderCell>Finalize</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {requestNode}
            </Table.Body>
        </Table>
    );
};

export default RequestTable;