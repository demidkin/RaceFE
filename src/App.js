import React, { Component } from 'react';
import Web3 from 'web3';

class App extends React.Component {

    constructor(prop) {
        super(prop)
        this.state = {
            AuctionEndDate: "01.01.2000 10:00",
            RaceStartDate: "01.01.2000 12:00",
            ContractStatus: "0",
            reward: 0,
            maxCar: 8,
            ContractReward: 0,
            auctionBtnEnabled: true,
            pendingReturn: 0,
            highestBids: [],
            myBids: [],
            carUpgrades: [],
            carPowers: [],
            mycars: [],
            upgradesCount: 0,
            upgradePrice: []
        }

        let web3 = window.web3
        if (typeof window.web3 != 'undefined') {
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(web3.currentProvider)
        } else {
            console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        }

        this.contractAddress = "0x9AE2135A03003711B089a7959C5656D6341C38E0";
        const MyContract = web3.eth.contract(this.getAbi())
        this.state.ContractInstance = MyContract.at(this.contractAddress)


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

        

    }
    getAbi(){
        let abi = [
            {
                "anonymous": false,
                "inputs": [],
                "name": "AuctionCanceled",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "myid",
                        "type": "bytes32"
                    },
                    {
                        "name": "result",
                        "type": "string"
                    }
                ],
                "name": "__callback",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_queryId",
                        "type": "bytes32"
                    },
                    {
                        "name": "_result",
                        "type": "string"
                    },
                    {
                        "name": "_proof",
                        "type": "bytes"
                    }
                ],
                "name": "__callback",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "auctionCancel",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "auctionEnd",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "auctionStart",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "carIndex",
                        "type": "uint256"
                    }
                ],
                "name": "bid",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "race",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "reward",
                        "type": "uint256"
                    }
                ],
                "name": "AuctionStarted",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [],
                "name": "AuctionEnded",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "carIndex",
                        "type": "uint256"
                    }
                ],
                "name": "HighestBidIncreased",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "carIndex",
                        "type": "uint256"
                    }
                ],
                "name": "upgradeCar",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "_beneficiary",
                        "type": "address"
                    },
                    {
                        "name": "_auctionEndDate",
                        "type": "uint256"
                    },
                    {
                        "name": "_raceStartDate",
                        "type": "uint256"
                    },
                    {
                        "name": "_maxCar",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "withdraw",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getAuctionEndDate",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "carIndex",
                        "type": "uint256"
                    }
                ],
                "name": "getCarPower",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "carIndex",
                        "type": "uint256"
                    }
                ],
                "name": "getCarUpgrades",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getContractStatus",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "carIndex",
                        "type": "uint256"
                    }
                ],
                "name": "gethighestBid",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getPandingReturnValue",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getRaceStartDate",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getRewardValue",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getUpgradesCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "getUpgradesPrice",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getWinner",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "carIndex",
                        "type": "uint256"
                    }
                ],
                "name": "isMyCar",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "carIndex",
                        "type": "uint256"
                    }
                ],
                "name": "myBidIsWin",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]
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
    updateCarUpgradePrice() {
        this.state.ContractInstance.getUpgradesCount((err, result) => {
            this.setState({ upgradesCount: parseInt(result) });
        })

        let upgrPrice = [];
        for (let i = 0; i < this.state.upgradesCount; i++) {
            this.state.ContractInstance.getUpgradesPrice(i,(err, res) => { 
                upgrPrice.push(parseInt(res));
            })
        }
        this.setState({ upgradePrice: upgrPrice })
    }
    setContractAddress = (address) => {
        let NewContract = window.web3.eth.contract(this.getAbi())
        let contract = NewContract.at(address)
        console.log(contract)
        if (contract !== null){
            this.state.ContractInstance = contract;
            this.contractAddress = address;
        }
    }

    upgradeCar(index){
        if (this.state.upgradePrice.length > 0){
            var functionData = this.state.ContractInstance.upgradeCar.getData(index);
            this.web3.eth.sendTransaction({
                to: this.contractAddress,
                from: this.web3.eth.accounts[0],
                data: functionData,
                value: this.state.upgradePrice[this.state.carUpgrades[index]]
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
                    this.setState({ ContractStatus: "Initsialising" })
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
    auctionBtnStatus() {
        if (this.ContractStatus === 'Initsialising') this.setState({ auctionBtnEnabled: true });
        this.setState({ auctionBtnEnabled: false });
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
        for (let i = 0; i < 8; i++) {
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
    updateCarOwnerStatus() {
        let owners = this.state.mycars;
        for (let i = 0; i < 8; i++) {
            this.state.ContractInstance.myBidIsWin(i, (err, result) => {
                owners[i] = result;
            })
        }
        this.setState({ mycars: owners });
    }
    updateCarUpgradesAndPower() {
        let upgrads = this.state.carUpgrades;
        let powers = this.state.carPowers;
        for (let i = 0; i < 8; i++) {
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

    updateState() {
        this.updateContractStatus();
        this.updateDateAuction();
        this.updateDateStartRace();
        this.auctionBtnStatus();
        this.updatePandingReturnValue();
        this.updateHighestBids();
        this.updateCarOwnerStatus();
        this.updateCarUpgradesAndPower();
        this.updateCarUpgradePrice();
        this.updateRewardValue();
        this.updatePandingReturnValue();
    }

    setupListeners() {
    }

    render() {
        return (
            <div class="container">
                <br />
                <RaceInfo data={this.state} fromWei={this.fromWei} onClick={this.withdraw}/>
                <br />
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-auction-tab" data-toggle="tab" href="#nav-auction" role="tab" aria-controls="nav-auction" aria-selected="true">Auction</a>
                        <a class="nav-item nav-link" id="nav-settings-tab" data-toggle="tab" href="#nav-settings" role="tab" aria-controls="nav-settings" aria-selected="false">Settings</a>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-auction" role="tabpanel" aria-labelledby="nav-auction-tab">
                        <br />
                        <Car carIndex="0" data={this.state} fromWei={this.fromWei} setBid={this.onChangeMyBids} onClickBid={this.bid} onClickUpgrade={this.upgradeCar}/>
                        <Car carIndex="1" data={this.state} fromWei={this.fromWei} setBid={this.onChangeMyBids} onClickBid={this.bid} onClickUpgrade={this.upgradeCar}/>
                        <Car carIndex="2" data={this.state} fromWei={this.fromWei} setBid={this.onChangeMyBids} onClickBid={this.bid} onClickUpgrade={this.upgradeCar}/>
                        <Car carIndex="3" data={this.state} fromWei={this.fromWei} setBid={this.onChangeMyBids} onClickBid={this.bid} onClickUpgrade={this.upgradeCar}/>
                        <Car carIndex="4" data={this.state} fromWei={this.fromWei} setBid={this.onChangeMyBids} onClickBid={this.bid} onClickUpgrade={this.upgradeCar}/>
                        <Car carIndex="5" data={this.state} fromWei={this.fromWei} setBid={this.onChangeMyBids} onClickBid={this.bid} onClickUpgrade={this.upgradeCar}/>
                        <Car carIndex="6" data={this.state} fromWei={this.fromWei} setBid={this.onChangeMyBids} onClickBid={this.bid} onClickUpgrade={this.upgradeCar}/>
                        <Car carIndex="7" data={this.state} fromWei={this.fromWei} setBid={this.onChangeMyBids} onClickBid={this.bid} onClickUpgrade={this.upgradeCar}/>
                        <Car carIndex="8" data={this.state} fromWei={this.fromWei} setBid={this.onChangeMyBids} onClickBid={this.bid} onClickUpgrade={this.upgradeCar}/>
                        <Car carIndex="9" data={this.state} fromWei={this.fromWei} setBid={this.onChangeMyBids} onClickBid={this.bid} onClickUpgrade={this.upgradeCar}/>
                    </div>
                    <div class="tab-pane fade" id="nav-settings" role="tabpanel" aria-labelledby="nav-settings-tab">
                        <RaceSettings data={this.state} fromWei={this.fromWei} onClickStartAuction={this.startAuction} onClickCancelAuction={this.auctionCancel} setReward={this.onChangeReward} setContractAddress={this.setContractAddress}/>
                    </div>
                </div>
            </div>
        )
    }
}

class RaceInfo extends React.Component {
    render() {
        return (
                <div class="card text-white bg-dark mb-3">
                    <div class="card-header">RACE</div>
                    <div class="card-body">
                        <b>Статус контракта:</b>&nbsp;
                        <span>{this.props.data.ContractStatus}</span><br />
                        <b>Дата завершения аукциона:</b> &nbsp;
                        <span>{this.props.data.AuctionEndDate}</span><br />
                        <b>Дата начала соревнований:</b> &nbsp;
                        <span>{this.props.data.RaceStartDate}</span><br />
                        <b>Награда победителю:</b>&nbsp;
                        <span>{this.props.fromWei(this.props.data.ContractReward, 'ether')}</span><br />
                        <b>Ваш невыплаченный баланс:</b>&nbsp;
                        <span>{this.props.fromWei(this.props.data.pendingReturn, 'ether')}</span> &nbsp;
                        <button class="btn btn-warning" type="button" onClick={() => this.props.onClick} disabled={this.props.data.pendingReturn === 0}>Забрать средства</button>
                    </div>
                </div>
        )}
}

class RaceSettings extends React.Component {
    render() {
        return (
            <div>
                <br />
                <b>Награда победителю (finney):</b> &nbsp;
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Reward eth" aria-label="Reward eth" aria-describedby="basic-addon2" onChange={(e) => {this.props.setReward(e)}}></input>
                    <div class="input-group-append">
                        <button class="btn btn-success btn-block" type="button" onClick={() => this.props.onClickStartAuction()} disabled={!(this.props.data.ContractStatus === 'Initsialising')}>Запустить аукцион</button>
                    </div>
                </div>
                <b>Награда победителю:</b> &nbsp;
                <span>{this.props.fromWei(this.props.data.reward, 'ether')}</span>
                <br />
                <button class="btn btn-danger btn-block" type="button" onClick={() => this.props.onClickCancelAuction()} disabled={!(this.props.data.ContractStatus === 'AuctionFault')}>Отменить аукцион</button>
                <br />
                <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#changeContractAddressModal">
                    Сменить адрес контракта
                </button>
                <ChangeContractAdress setContractAddress={this.props.setContractAddress}/>
            </div>
        )}

}
    
class ChangeContractAdress extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            contractAddress: ""
        }
    }
    render() {
        return (
                <div class="modal fade" id="changeContractAddressModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Смена адреса контракта</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="text" class="form-control" placeholder="Contract address" aria-label="Contract address" aria-describedby="basic-addon2" onChange={(e) => {this.setState({contractAddress: e.target.value})}}></input>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => this.props.setContractAddress(this.state.contractAddress)}>Сохранить изменения</button>
                    </div>
                    </div>
                </div>
                </div>  
        )}

}

class Car extends React.Component {
    
    bidIsWin(){
        if (this.props.data.mycars[this.props.carIndex]) return "Да"
        else return "Нет"
    }    
    getCardStatus(){
        if (this.props.data.mycars[this.props.carIndex]) return "bg-success"
        else return "bg-secondary" 
    }

    render(){
        return (
                <div class={"card text-white mb-3 " + this.getCardStatus()}>
                    <div class="card-header">Car #{parseInt(this.props.carIndex)+1}</div>
                    <div class="card-body">
                        <b>Номер: </b>&nbsp;
                        <span>{parseInt(this.props.carIndex)+1}</span><br />
                        <b>Мощьность автомобиля: </b>&nbsp;
                        <span>{this.props.data.carPowers[this.props.carIndex] / 100} л\с</span><br />
                        <b>Текущая стоимость: </b>&nbsp;
                        <span>{this.props.data.highestBids[this.props.carIndex]} eth</span><br />
                        <b>Уровень апгрейдов: </b>&nbsp;
                        <span>{this.props.data.carUpgrades[this.props.carIndex]} lvl</span><br />
                        <b>Ваша ставка выйграла: </b>&nbsp;
                        <span>{this.bidIsWin()}</span><br /><br />
                        <div class="input-group mb-3">
                            <input id={"bidInputId" + this.props.carIndex} type="text" class="form-control" placeholder="Bid fynney" aria-label="Bid fynney" aria-describedby="basic-addon2" onChange={(e) => this.props.setBid(e,this.props.carIndex)}></input>
                            <div class="input-group-append">
                                <button id={"bidBtnId" + this.props.carIndex} class="btn btn-dark" type="button" onClick={() => this.props.onClickBid(this.props.carIndex)} disabled={!(this.props.data.ContractStatus === 'Auction')}>Сделать ставку</button>
                            </div>
                        </div>
                        <b>Ставка: </b> &nbsp;
                        <span>{this.props.fromWei(this.props.data.myBids[this.props.carIndex])}</span>
                        <button class="btn btn-dark btn-block" type="button" onClick={() => this.props.onClickUpgrade(this.props.carIndex)} disabled={!(this.props.data.ContractStatus === 'PreparationForTheRace')}>Улучшить автомобиль</button>
                    </div>
                </div>
        );
    }
}


export default App;
