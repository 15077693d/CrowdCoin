import React from 'react';
import Layout from '../../../components/Layout'
import { Form, Button, Message } from 'semantic-ui-react'
import { useState } from 'react'
import campaigin from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Router, Link } from '../../../routes'
const New = ({ address }) => {
    const [description, setDescription] = useState()
    const [recipient, setRecipient] = useState()
    const [ether, setEther] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async () => {
        setLoading(true)
        const accounts = await web3.eth.getAccounts()
        console.log(accounts[0],
            description,
            ether,
            recipient,
        )
        await campaigin(address).methods.createRequest(
            description,
            description,
            web3.utils.toWei(ether, 'ether'),
            recipient,
        ).send({
            from: accounts[0]
        }).on(
            'error', (error) => {
                setError(error.message)
                setLoading(false)
            }
        ).on(
            'transactionHash', (transactionHash) => {
                console.log(transactionHash)
            }
        ).on(
            'receipt', (receipt) => {
                setError(false)
                setLoading(false)
                console.log(receipt)
                Router.replace(`/campaigns/${address}/requests`);
            }
        )
    }
    return (
        <Layout>
            <Link route={`/campaigns/${address}/requests`}>
                <a>
                    <Button primary style={{ marginBottom: 10 }}>
                        back
              </Button>
                </a>
            </Link>
            <Form onSubmit={handleSubmit} error={error}>
                <Form.Field>
                    <label>Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <input type="number" step="0.01" value={ether} onChange={(e) => setEther(e.target.value)} required />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
                </Form.Field>
                <Message error>
                    <Message.Header>
                        Oops!
                    </Message.Header>
                    <p>{error}</p>
                </Message>
                <Button disable={`"${loading}"`} loading={loading} type="submit" color="blue">
                    Create!
              </Button>
            </Form>
        </Layout>
    );
};

New.getInitialProps = async ({ query }) => {
    const address = query.address
    return { address }
}
export default New;