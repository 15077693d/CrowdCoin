import web3 from './web3';
import CampaignFactory from './build/:CampaignFactory.json';
const factory = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x7b34436A773726404FE76e657DeaB5FB58e9c16E"
);

export default factory;