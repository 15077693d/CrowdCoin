import React from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import { useState } from 'react';
import campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3'
import { Router } from '../routes'
const ContributeForm = ({ address, minimumContribution }) => {
    const [contribution, setContribution] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const handleChange = (e) => {
        setContribution(e.target.value)
    }
    const handleSubmit = async () => {
        setLoading(true)
        const accounts = await web3.eth.getAccounts()
        await campaign(address).methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei(String(contribution), 'ether'),
        }).on(
            'error', (error) => {
                setError(error.message)
                setLoading(false)
            }
        )
        //setLoading(false)
        Router.replace(`/campaigns/${address}`)
    }
    return (
        <Form onSubmit={handleSubmit} error={error}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input min={web3.utils.fromWei(minimumContribution, 'ether')} step="0.0000000000000001" type="number" value={contribution} onChange={handleChange} label="ether" labelPosition="right" required />
            </Form.Field>
            <Message error>
                <Message.Header>
                    Oops
                </Message.Header>
                <p>{error}</p>
            </Message>
            <Button disabled={loading} loading={loading} color="blue" type="submit">Contribute!</Button>
        </Form>
    );
};

export default ContributeForm;