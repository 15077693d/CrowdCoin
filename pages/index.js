import React from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout'
import { Link } from '../routes'
export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return { props: { campaigns } }
}

const index = ({ campaigns }) => {
    const items = campaigns.map(address => {
        return {
            header: `${address}`,
            description:  <Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>,
            fluid: true,
            style:{overflowWrap:'break-word'}
        }
    })
    return (
        <Layout>
            <h2>Open Campaign</h2>
            <Link route='/campaigns/new'>
                <a>
                    <Button floated="right" icon="add circle" content="Create Campaign" color="blue" />
                </a>
            </Link>
            <Card.Group items={items} />
        </Layout>
    );
};

export default index;