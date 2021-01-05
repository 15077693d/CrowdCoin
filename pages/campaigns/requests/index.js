import React from 'react';
import Layout from '../../../components/Layout'
import { Button } from 'semantic-ui-react'
import { Link } from '../../../routes'
import campaign from '../../../ethereum/campaign'
import RequestTable from '../../../components/RequestTable'
const request = ({ address, requests, approverTotalCount }) => {
    return (
        <Layout>
            <h2>Requests</h2>
            <Link route={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button color="blue">Add Request</Button>
                </a>
            </Link>
            <RequestTable address={address} requests={requests} approverTotalCount={approverTotalCount}/>
        </Layout>
    );
};

request.getInitialProps = async ({ query }) => {
    const address = query.address
    const approverTotalCount = query.approverCount
    const count = await campaign(address).methods.getRequestCount().call()
    const requests = await Promise.all(
        Array(Number(count)).fill().map((item, i) => {
            return campaign(address).methods.getRequestSummary(i).call();
        })
    )
    return { address, count, requests, approverTotalCount }
}

export default request;