import abi from './abi';
import Web3 from 'web3';

const web3 = window.web3
if (typeof window.web3 != 'undefined') {
    console.log("Using web3 detected from external source like Metamask")
    this.web3 = new Web3(web3.currentProvider)
} else {
    console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}

const contractAddress = "0x896F8Da27703F80e329E6822807EacF3830deeE4";
const Contract = web3.eth.contract(abi)
const ContractInstance = Contract.at(contractAddress)

export default ContractInstance