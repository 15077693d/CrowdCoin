import React from 'react';
import Layout from '../../components/Layout'
import { useState } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'
const New = () => {
    const [minContribution, setMinContribution] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => setMinContribution(e.target.value)
    const handleSubmit = async () => {
        setLoading(true)
        const accounts = await web3.eth.getAccounts()
        console.log(accounts[0])
        await factory.methods.createCampaign(
            minContribution,
            "test",
            "test",
            "test",
            123,
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
                Router.pushRoute('/');
            }
        )
    }
return (
    <Layout>
        <Form onSubmit={handleSubmit} error={error}>
            <h2>Create a Campaign</h2>
            <Form.Field>
                <label>Minimum Contribution</label>
                <Input onChange={handleChange} value={minContribution} label="wei" min={1} labelPosition='right' type="number" required />
            </Form.Field>
            <Message error>
                <Message.Header>
                    Oops!
                    </Message.Header>
                <p>{error}</p>
            </Message>
            <Button color="blue" type="submit" loading={loading} disabled={loading}>Create!</Button>
        </Form>
    </Layout>
);
};

export default New;