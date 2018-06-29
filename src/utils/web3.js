import Web3 from 'web3';

var web3 = window.web3
if (typeof window.web3 != 'undefined') {
    console.log("Using web3 detected from external source like Metamask")
    web3 = new Web3(web3.currentProvider)
} else {
    console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}

export function fromWei(wei){
    return web3.fromWei(wei, 'ether')
}