import React, { Component } from 'react';
import Web3 from 'web3';
import { connect } from 'react-redux';

import RaceInfo from './components/RaceInfo';
import RaceSettings from './components/RaceSettings';
import Cars from './components/Cars';
import Help from './components/Help';
import abi from './abi';






class App extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            AuctionEndDate: "01.01.2000 10:00",
            RaceStartDate: "01.01.2000 12:00",
            ContractStatus: "100",
            reward: 0,
            maxCar: 0,
            ContractReward: 0,
            auctionBtnEnabled: true,
            pendingReturn: 0,
            highestBids: [],
            myBids: [],
            carUpgrades: [],
            carPowers: [],
            mycars: [],
            upgradesCount: 0,
            upgradePrice: [],
            winner: 1000,
            OraclizePrice: 0,
            allCarsPower :0
        }

        let web3 = window.web3
        if (typeof window.web3 != 'undefined') {
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(web3.currentProvider)
        } else {
            console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        }

        this.contractAddress = "0x896F8Da27703F80e329E6822807EacF3830deeE4";
        const MyContract = web3.eth.contract(this.getAbi())
        this.state.ContractInstance = MyContract.at(this.contractAddress)




        this.updateDateAuction();
        this.updateDateStartRace();
        this.updateMaxCarValue();
        this.updateUpgradesCount();
        this.getOraclizePrice();

    }

    updateMaxCarValue(){
        this.state.ContractInstance.getMaxCarValue((err, result) => {
            this.setState({ maxCar: parseInt(result) });

            let hb = []
            let mb = []
            let cu = []
            let cp = []
            let mc = []
            for (let i = 0; i < this.state.maxCar; i++){
                hb.push(0)
                mb.push(0)
                cu.push(0)
                cp.push(0)
                mc.push(false)
            }
            this.setState({highestBids: hb})
            this.setState({myBids: mb})
            this.setState({carUpgrades: cu})
            this.setState({carPowers: cp})
            this.setState({mycars: mc})
        })      
    }
    
    getAbi(){
        return abi
    }

    fromWei = (value) => {
        return (this.web3.fromWei(value, 'ether') + ' eth')
    }

    componentDidMount() {
        this.updateState()
        this.setupListeners()
        setInterval(this.updateState.bind(this), 10e2)
    }

    updateUpgradesCount(){
        this.state.ContractInstance.getUpgradesCount((err, result) => {  

            this.setState({ upgradesCount: parseInt(result)})
            //this.updateCarUpgradePrice();
            
        })
    }

    updateCarUpgradePrice() {
        let upgrPrice = [];
        for (let i = 0; i < this.state.upgradesCount; i++) {
            this.state.ContractInstance.getUpgradesPrice(i,(err, res) => { 
                upgrPrice.push(parseInt(res));
            })
        }
        this.setState({ upgradePrice: upgrPrice })
        console.log(this.state.upgradePrice)
    }
    setContractAddress = (address) => {
        let NewContract = window.web3.eth.contract(this.getAbi())
        let contract = NewContract.at(address)
        console.log(contract)
        if (contract !== null){
            this.state.ContractInstance = contract;
            this.contractAddress = address;
        }

        this.updateDateAuction();
        this.updateDateStartRace();
        this.updateUpgradesCount();
        this.updateMaxCarValue();
        this.getOraclizePrice();
    }

    upgradeCar = (index) => {
        if (index < this.state.maxCar)
            if (this.state.carUpgrades[index] < this.state.upgradesCount)
            {
                this.state.ContractInstance.getUpgradesPrice(this.state.carUpgrades[index],(err, res) => { 
                    let price = parseInt(res);

                    var functionData = this.state.ContractInstance.upgradeCar.getData(index);
                    this.web3.eth.sendTransaction({
                        to: this.contractAddress,
                        from: this.web3.eth.accounts[0],
                        data: functionData,
                        value: price
                    },
                        function (error) {
                            console.log(error);
                        }
                    )                
                })
            }

        if (this.state.upgradePrice.length > 0){
            var functionData = this.state.ContractInstance.upgradeCar.getData(index);
            this.web3.eth.sendTransaction({
                to: this.contractAddress,
                from: this.web3.eth.accounts[0],
                data: functionData,
                value: this.state.upgradePrice[this.state.carUpgrades[index]+1]
            },
                function (error) {
                    console.log(error);
                }
            )
        }
    }
    updateContractStatus() {
        this.state.ContractInstance.getContractStatus((err, result) => {
            //console.log("ContractStatus: " + parseInt(result));
            switch (parseInt(result)) {
                case 0:
                    this.setState({ ContractStatus: "Initialising" })
                    break;
                case 1:
                    this.setState({ ContractStatus: "Auction" })
                    break;
                case 2:
                    this.setState({ ContractStatus: "AuctionFault" })
                    break;
                case 3:
                    this.setState({ ContractStatus: "PreparationForTheRace" })
                    break;
                case 4:
                    this.setState({ ContractStatus: "RaceIsOver" })
                    break;
                case 5:
                    this.setState({ ContractStatus: "Stop" })
                    break;
                case 6:
                    this.setState({ ContractStatus: "AuctionEnded" })
                    break;
                default:
                    this.setState({ ContractStatus: "Status unknow" })
            }
        })
    }

    updateDateAuction() {
        this.state.ContractInstance.getAuctionEndDate((err, result) => {
            const date = new Date(parseInt(result) * 1000);
            this.setState({ AuctionEndDate: date.toLocaleString() })
        })
    }

    updateDateStartRace() {
        this.state.ContractInstance.getRaceStartDate((err, result) => {
            const date = new Date(parseInt(result) * 1000);
            this.setState({ RaceStartDate: date.toLocaleString() })
        })
    }
    onChangeReward = (e) => {
        this.setState({ reward: this.web3.toWei(parseFloat(e.target.value), 'finney') })
    }

    startAuction = () => {
        var functionData = this.state.ContractInstance.auctionStart.getData();
        this.web3.eth.sendTransaction({
            to: this.contractAddress,
            from: this.web3.eth.accounts[0],
            data: functionData,
            value: this.state.reward
        },
            function (error) {
                console.log(error);
            }
        )
    }

    updatePandingReturnValue() {
        // this.state.ContractInstance.getPandingReturnValue((err, result) => {
        //     this.setState({ pendingReturn: this.web3.fromWei(parceInt(result),'ether')})
        // })
    }
    withdraw = () => {
        this.state.ContractInstance.withdraw((err, result) => {
            console.log(result);
            console.log(err);
        });
    }

    updateHighestBids() {
        let BIDS = this.state.highestBids;
        for (let i = 0; i < this.state.maxCar; i++) {
            this.state.ContractInstance.gethighestBid(i, (err, result) => {
                BIDS[i] = this.web3.fromWei(parseInt(result), 'ether');
            })
        }
        this.setState({ highestBids: BIDS });
    }
    bid = (index) => {
        if (this.state.highestBids[index] < this.state.myBids[index]) {
            var functionData = this.state.ContractInstance.bid.getData(index);
            this.web3.eth.sendTransaction({
                to: this.contractAddress,
                from: this.web3.eth.accounts[0],
                data: functionData,
                value: this.state.myBids[index]
            },
                function (error) {
                    console.log(error);
                }
            )
        }
    }
    onClickAuctionEnd = () => {
        this.state.ContractInstance.auctionEnd((err) => {
            console.log(err)
        })
    }
    //todo: Сделать через Трансер, попбробовать заложить валуе 0
    onClickRace = () => {
        if (this.state.OraclizePrice > 0){
            var functionData = this.state.ContractInstance.race.getData();
            this.web3.eth.sendTransaction({
                to: this.contractAddress,
                from: this.web3.eth.accounts[0],
                data: functionData,
                value: this.state.OraclizePrice
            },
                function (error) {
                    console.log(error);
                }
            )
        }

    }
    updateCarOwnerStatus() {
        let owners = this.state.mycars;
        for (let i = 0; i < this.state.maxCar; i++) {
            this.state.ContractInstance.myBidIsWin(i, (err, result) => {
                owners[i] = result;
            })
        }
        this.setState({ mycars: owners });
    }
    updateCarUpgradesAndPower() {
        let upgrads = this.state.carUpgrades;
        let powers = this.state.carPowers;
        for (let i = 0; i < this.state.maxCar; i++) {
            this.state.ContractInstance.getCarPower(i, (err, result) => {
                powers[i] = parseInt(result);
            })
            this.state.ContractInstance.getCarUpgrades(i, (err, result) => {
                upgrads[i] = parseInt(result);
            })
        }
        this.setState({ carUpgrades: upgrads });
        this.setState({ carPowers: powers });
    }
    onChangeMyBids = (e, index) => {
        let BIDS = this.state.myBids;
        BIDS[index] = this.web3.toWei(e.target.value, 'finney');
        this.setState({ myBids: BIDS });
    }
    updateRewardValue(){
        this.state.ContractInstance.getRewardValue((err, result) => {
            
            this.setState({ ContractReward: parseInt(result)})
        })
    }
    updatePandingReturnValue(){
        this.state.ContractInstance.getPandingReturnValue((err, result) => {
            
            this.setState({ pendingReturn: parseInt(result)})
        })
    }

    auctionCancel = () => {
        this.state.ContractInstance.auctionCancel((err) => {
            
            console.log(err);
        })
    }
    getWinner(){
        this.state.ContractInstance.getWinner((err, result) => {
            this.setState({winner : parseInt(result)})
        })
    }
    getOraclizePrice(){
        this.state.ContractInstance.getOraclizePrice((err, result) => {
            this.setState({OraclizePrice : parseInt(result)})
        })
    }    
    updateAllCarsPower(){
        this.state.ContractInstance.getAllCarsPower((err, result) => {
            this.setState({allCarsPower : parseInt(result)})
        })
    }

    updateState() {
        this.updateContractStatus();
        this.updatePandingReturnValue();
        this.updateHighestBids();
        this.updateCarOwnerStatus();
        this.updateCarUpgradesAndPower();
        this.updateRewardValue();
        this.getWinner();
        this.updateAllCarsPower();
        
    }

    setupListeners() {
    }

    render() {
        console.log(this.props.testStore)
        return (
            <div class="container">
                <br />
                <RaceInfo data={this.state} fromWei={this.fromWei} onClick={this.withdraw} contractAddress={this.contractAddress}/>
                <br />
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-auction-tab" data-toggle="tab" href="#nav-auction" role="tab" aria-controls="nav-auction" aria-selected="true">Auction</a>
                        <a class="nav-item nav-link" id="nav-help-tab" data-toggle="tab" href="#nav-help" role="tab" aria-controls="nav-help" aria-selected="true">Help</a>
                        <a class="nav-item nav-link" id="nav-settings-tab" data-toggle="tab" href="#nav-settings" role="tab" aria-controls="nav-settings" aria-selected="false">Settings</a>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-auction" role="tabpanel" aria-labelledby="nav-auction-tab">
                        <br />
                        <Cars data={this.state} fromWei={this.fromWei} setBid={this.onChangeMyBids} onClickBid={this.bid} onClickUpgrade={this.upgradeCar}/>
                    </div>
                    <div class="tab-pane fade" id="nav-help" role="tabpanel" aria-labelledby="nav-help-tab">
                        <br />
                        <Help />
                    </div>                    
                    <div class="tab-pane fade" id="nav-settings" role="tabpanel" aria-labelledby="nav-settings-tab">
                        <RaceSettings data={this.state} fromWei={this.fromWei} onClickStartAuction={this.startAuction} onClickCancelAuction={this.auctionCancel} setReward={this.onChangeReward} setContractAddress={this.setContractAddress} onClickAuctionEnd={this.onClickAuctionEnd} onClickRace={this.onClickRace}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
        state => ({
            testStore: state
        }),
        dispatch => ({
            onWithdraw: () => {
                dispatch({ type: 'WITHDRAW'})
            }
        })
    )(App);
