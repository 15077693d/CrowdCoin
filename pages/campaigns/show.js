import React from 'react';
import campaign from '../../ethereum/campaign'
import Layout from '../../components/Layout'
import { Card, Grid, Button } from 'semantic-ui-react'
import ContributeForm from '../../components/ContributeForm'
import web3 from '../../ethereum/web3'
import { Link } from '../../routes'

const show = ({ summary }) => {
    const [balance, minimumContribution, requestCount, approverCount, manager, address] = summary
    const items = [
        { header: manager, meta: "Address of Manager", description: "The manager created this campaign and can create requests to withdraw money", fiuld: "true", style: { overflowWrap: 'break-word' } },
        { header: minimumContribution, meta: "Minimum Contribution (wei)", description: "You must contribute at least this much wei to become an approver", fiuld: "true", style: { overflowWrap: 'break-word' } },
        { header: requestCount, meta: "Number of Requests", description: "A request tries to withdraw money from the contract. Req", fiuld: "true", style: { overflowWrap: 'break-word' } },
        { header: approverCount, meta: "Number of Approvers", description: "Number of people who have already donated to this campaign", fiuld: "true", style: { overflowWrap: 'break-word' } },
        { header: web3.utils.fromWei(balance, 'ether'), meta: "Campaign Balance(ether)", description: "The balance is how much money this campaign has left to spend", fiuld: "true", style: { overflowWrap: 'break-word' } },
    ]
    return (
        <Layout>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={11}>
                        <Card.Group items={items} />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <ContributeForm address={address} minimumContribution={minimumContribution} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column >
                        <Link href={{ pathname: `/campaigns/${address}/requests`, query: { approverCount } }} >
                            <a>
                                <Button color='blue'>
                                    View Requests
                    </Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    );
};

show.getInitialProps = async ({ query }) => {
    const instance = campaign(query.address)
    const summary = Object.values(await instance.methods.getSummary().call())
    summary.push(query.address)
    return { summary }
}
export default show;