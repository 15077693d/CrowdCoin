const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/:CampaignFactory.json')
require('dotenv').config();
const provider = new HDWalletProvider(
    process.env.PASSWORD,
    process.env.INFURA_LINK
)

const web3 = new Web3(provider);
const deploy = async () => {
    accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account: ', accounts[0])
    let campaignFactory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '10000000', from: accounts[0] })
        .on('transactionHash', function (hash) {
            console.log(hash);
        })
        .on('receipt', function (receipt) {
            console.log(receipt);
        });
}

deploy()
