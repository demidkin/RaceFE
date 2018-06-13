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
            auctionBtnEnabled: true,
            pendingReturn: 0,
            highestBids: [0, 0, 0, 0, 0, 0, 0, 0],
            myBids: [0, 0, 0, 0, 0, 0, 0, 0],
            carUpgrades: [0, 0, 0, 0, 0, 0, 0, 0],
            carPowers: [0, 0, 0, 0, 0, 0, 0, 0],
            mycars: [false, false, false, false, false, false, false, false],
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

        var abi = [
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
                "anonymous": false,
                "inputs": [],
                "name": "AuctionCanceled",
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
        ];

        this.contractAddress = "0x52AFe9B949Da82F75B1007e04656EF89fF7e2510";
        const MyContract = web3.eth.contract(abi)
        this.state.ContractInstance = MyContract.at(this.contractAddress)
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
            console.log("ContractStatus: " + parseInt(result));
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
    onChangeReward(e) {
        this.setState({ reward: this.web3.toWei(parseFloat(e.target.value), 'finney') })
    }

    startAuction() {
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
    withdraw() {
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
    bid(index) {
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
    updateCarInfo() {
        for (let i = 0; i < 8; i++) {
            if (this.state.mycars[i]) {
                let card = document.getElementById('cardCar' + i);
                card.className = 'card text-white bg-success mb-3';
                let text = document.getElementById('car' + i + 'OwnerText');
                text.innerHTML = 'Да';
            }
            else {
                let card = document.getElementById('cardCar' + i);
                card.className = 'card text-white bg-info mb-3';
                let text = document.getElementById('car' + i + 'OwnerText');
                text.innerHTML = 'Нет';
            }
        }
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
    onChangeMyBids(e, index) {
        let BIDS = this.state.myBids;
        BIDS[index] = this.web3.toWei(e.target.value, 'finney');
        this.setState({ myBids: BIDS });
    }


    updateState() {
        this.updateContractStatus();
        this.updateDateAuction();
        this.updateDateStartRace();
        this.auctionBtnStatus();
        this.updatePandingReturnValue();
        this.updateCarInfo();
        this.updateHighestBids();
        this.updateCarOwnerStatus();
        this.updateCarUpgradesAndPower();
        this.updateCarUpgradePrice();
    }

    setupListeners() {
    }

    render() {
        return (
            <div class="container">
                <br />
                <b>Статус контракта:</b> &nbsp;
                <span>{this.state.ContractStatus}</span>
                <br />
                <b>Дата завершения аукциона:</b> &nbsp;
                <span>{this.state.AuctionEndDate}</span>
                <br />
                <b>Дата начала соревнований:</b> &nbsp;
                <span>{this.state.RaceStartDate}</span><br />
                <b>Награда победителю:</b> &nbsp;
                <span>{this.web3.fromWei(this.state.reward, 'ether')} eth</span><br />
                <b>Ваш невыплаченный баланс:</b> &nbsp;
                <span>{this.web3.fromWei(this.state.pendingReturn, 'ether')} eth</span>
                <br />
                <br />
                <div class="row">
                    <div class="col-3">
                        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a class="nav-link active" id="v-pills-auction-tab" data-toggle="pill" href="#v-pills-auction" role="tab" aria-controls="v-pills-auction" aria-selected="true">Auction</a>
                            <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                        </div>
                    </div>
                    <div class="col-9">
                        <div class="tab-content" id="v-pills-tabContent">
                            <div class="tab-pane fade show active" id="v-pills-auction" role="tabpanel" aria-labelledby="v-pills-auction-tab">
                                <div class="card text-white bg-info mb-3" id="cardCar0">
                                    <div class="card-header">Car #1</div>
                                    <div class="card-body">
                                        <b>Номер: </b>&nbsp;
                                        <span>01</span><br />
                                        <b>Мощьность автомобиля: </b>&nbsp;
                                        <span>{this.state.carPowers[0] / 100} л\с</span><br />
                                        <b>Текущая стоимость: </b>&nbsp;
                                        <span>{this.state.highestBids[0]} eth</span><br />
                                        <b>Уровень апгрейдов: </b>&nbsp;
                                        <span>{this.state.carUpgrades[0]} lvl</span><br />
                                        <b>Ваша ставка выйграла: </b>&nbsp;
                                        <span id="car0OwnerText">Да</span><br /><br />
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Bid fynney" aria-label="Bid fynney" aria-describedby="basic-addon2" onChange={(e) => this.onChangeMyBids(e, 0)}></input>
                                            <div class="input-group-append">
                                                <button class="btn btn-dark" type="button" onClick={() => this.bid(0)} disabled={!(this.state.ContractStatus == 'Auction')}>Сделать ставку</button>
                                            </div>
                                        </div>
                                        <b>Ставка: </b> &nbsp;
                                        <span>{this.web3.fromWei(this.state.myBids[0], 'ether')} eth</span>
                                        <button class="btn btn-dark btn-block" type="button" onClick={() => this.upgradeCar(0)} disabled={!(this.state.ContractStatus == 'PreparationForTheRace')}>Улучшить автомобиль</button>
                                    </div>
                                </div>
                                <div class="card text-white bg-info mb-3" id="cardCar1">
                                    <div class="card-header">Car #2</div>
                                    <div class="card-body">
                                        <b>Номер: </b>&nbsp;
                                        <span>02</span><br />
                                        <b>Мощьность автомобиля: </b>&nbsp;
                                        <span>{this.state.carPowers[1] / 100} л\с</span><br />
                                        <b>Текущая стоимость: </b>&nbsp;
                                        <span>{this.state.highestBids[1]} eth</span><br />
                                        <b>Уровень апгрейдов: </b>&nbsp;
                                        <span>{this.state.carUpgrades[1]} lvl</span><br />
                                        <b>Ваша ставка выйграла: </b>&nbsp;
                                        <span id="car1OwnerText">Да</span><br /><br />
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Bid fynney" aria-label="Bid fynney" aria-describedby="basic-addon2" onChange={(e) => this.onChangeMyBids(e, 1)}></input>
                                            <div class="input-group-append">
                                                <button class="btn btn-dark" type="button" onClick={() => this.bid(1)} disabled={!(this.state.ContractStatus == 'Auction')}>Сделать ставку</button>
                                            </div>
                                        </div>
                                        <b>Ставка: </b> &nbsp;
                                        <span>{this.web3.fromWei(this.state.myBids[1], 'ether')} eth</span>
                                        <button class="btn btn-dark btn-block" type="button" onClick={() => this.upgradeCar(1)} disabled={!(this.state.ContractStatus == 'PreparationForTheRace')}>Улучшить автомобиль</button>
                                    </div>
                                </div>
                                <div class="card text-white bg-info mb-3" id="cardCar2">
                                    <div class="card-header">Car #3</div>
                                    <div class="card-body">
                                        <b>Номер: </b>&nbsp;
                                        <span>03</span><br />
                                        <b>Мощьность автомобиля: </b>&nbsp;
                                        <span>{this.state.carPowers[2] / 100} л\с</span><br />
                                        <b>Текущая стоимость: </b>&nbsp;
                                        <span>{this.state.highestBids[2]} eth</span><br />
                                        <b>Уровень апгрейдов: </b>&nbsp;
                                        <span>{this.state.carUpgrades[2]} lvl</span><br />
                                        <b>Ваша ставка выйграла: </b>&nbsp;
                                        <span id="car2OwnerText">Да</span><br /><br />
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Bid fynney" aria-label="Bid fynney" aria-describedby="basic-addon2" onChange={(e) => this.onChangeMyBids(e, 2)}></input>
                                            <div class="input-group-append">
                                                <button class="btn btn-dark" type="button" onClick={() => this.bid(2)} disabled={!(this.state.ContractStatus == 'Auction')}>Сделать ставку</button>
                                            </div>
                                        </div>
                                        <b>Ставка: </b> &nbsp;
                                        <span>{this.web3.fromWei(this.state.myBids[2], 'ether')} eth</span>
                                        <button class="btn btn-dark btn-block" type="button" onClick={() => this.upgradeCar(2)} disabled={!(this.state.ContractStatus == 'PreparationForTheRace')}>Улучшить автомобиль</button>
                                    </div>
                                </div>
                                <div class="card text-white bg-info mb-3" id="cardCar3">
                                    <div class="card-header">Car #4</div>
                                    <div class="card-body">
                                        <b>Номер: </b>&nbsp;
                                        <span>04</span><br />
                                        <b>Мощьность автомобиля: </b>&nbsp;
                                        <span>{this.state.carPowers[3] / 100} л\с</span><br />
                                        <b>Текущая стоимость: </b>&nbsp;
                                        <span>{this.state.highestBids[3]} eth</span><br />
                                        <b>Уровень апгрейдов: </b>&nbsp;
                                        <span>{this.state.carUpgrades[3]} lvl</span><br />
                                        <b>Ваша ставка выйграла: </b>&nbsp;
                                        <span id="car3OwnerText">Да</span><br /><br />
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Bid fynney" aria-label="Bid fynney" aria-describedby="basic-addon2" onChange={(e) => this.onChangeMyBids(e, 3)}></input>
                                            <div class="input-group-append">
                                                <button class="btn btn-dark" type="button" onClick={() => this.bid(3)} disabled={!(this.state.ContractStatus == 'Auction')}>Сделать ставку</button>
                                            </div>
                                        </div>
                                        <b>Ставка: </b> &nbsp;
                                        <span>{this.web3.fromWei(this.state.myBids[3], 'ether')} eth</span>
                                        <button class="btn btn-dark btn-block" type="button" onClick={() => this.upgradeCar(3)} disabled={!(this.state.ContractStatus == 'PreparationForTheRace')}>Улучшить автомобиль</button>
                                    </div>
                                </div>
                                <div class="card text-white bg-info mb-3" id="cardCar4">
                                    <div class="card-header">Car #5</div>
                                    <div class="card-body">
                                        <b>Номер: </b>&nbsp;
                                        <span>05</span><br />
                                        <b>Мощьность автомобиля: </b>&nbsp;
                                        <span>{this.state.carPowers[4] / 100} л\с</span><br />
                                        <b>Текущая стоимость: </b>&nbsp;
                                        <span>{this.state.highestBids[4]} eth</span><br />
                                        <b>Уровень апгрейдов: </b>&nbsp;
                                        <span>{this.state.carUpgrades[4]} lvl</span><br />
                                        <b>Ваша ставка выйграла: </b>&nbsp;
                                        <span id="car4OwnerText">Да</span><br /><br />
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Bid fynney" aria-label="Bid fynney" aria-describedby="basic-addon2" onChange={(e) => this.onChangeMyBids(e, 4)}></input>
                                            <div class="input-group-append">
                                                <button class="btn btn-dark" type="button" onClick={() => this.bid(4)} disabled={!(this.state.ContractStatus == 'Auction')}>Сделать ставку</button>
                                            </div>
                                        </div>
                                        <b>Ставка: </b> &nbsp;
                                        <span>{this.web3.fromWei(this.state.myBids[4], 'ether')} eth</span>
                                        <button class="btn btn-dark btn-block" type="button" onClick={() => this.upgradeCar(4)} disabled={!(this.state.ContractStatus == 'PreparationForTheRace')}>Улучшить автомобиль</button>
                                    </div>
                                </div>
                                <div class="card text-white bg-info mb-3" id="cardCar5">
                                    <div class="card-header">Car #6</div>
                                    <div class="card-body">
                                        <b>Номер: </b>&nbsp;
                                        <span>06</span><br />
                                        <b>Мощьность автомобиля: </b>&nbsp;
                                        <span>{this.state.carPowers[5] / 100} л\с</span><br />
                                        <b>Текущая стоимость: </b>&nbsp;
                                        <span>{this.state.highestBids[5]} eth</span><br />
                                        <b>Уровень апгрейдов: </b>&nbsp;
                                        <span>{this.state.carUpgrades[5]} lvl</span><br />
                                        <b>Ваша ставка выйграла: </b>&nbsp;
                                        <span id="car5OwnerText">Да</span><br /><br />
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Bid fynney" aria-label="Bid fynney" aria-describedby="basic-addon2" onChange={(e) => this.onChangeMyBids(e, 5)}></input>
                                            <div class="input-group-append">
                                                <button class="btn btn-dark" type="button" onClick={() => this.bid(5)} disabled={!(this.state.ContractStatus == 'Auction')}>Сделать ставку</button>
                                            </div>
                                        </div>
                                        <b>Ставка: </b> &nbsp;
                                        <span>{this.web3.fromWei(this.state.myBids[5], 'ether')} eth</span>
                                        <button class="btn btn-dark btn-block" type="button" onClick={() => this.upgradeCar(5)} disabled={!(this.state.ContractStatus == 'PreparationForTheRace')}>Улучшить автомобиль</button>
                                    </div>
                                </div>
                                <div class="card text-white bg-info mb-3" id="cardCar6">
                                    <div class="card-header">Car #7</div>
                                    <div class="card-body">
                                        <b>Номер: </b>&nbsp;
                                        <span>07</span><br />
                                        <b>Мощьность автомобиля: </b>&nbsp;
                                        <span>{this.state.carPowers[6] / 100} л\с</span><br />
                                        <b>Текущая стоимость: </b>&nbsp;
                                        <span>{this.state.highestBids[6]} eth</span><br />
                                        <b>Уровень апгрейдов: </b>&nbsp;
                                        <span>{this.state.carUpgrades[6]} lvl</span><br />
                                        <b>Ваша ставка выйграла: </b>&nbsp;
                                        <span id="car6OwnerText">Да</span><br /><br />
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Bid fynney" aria-label="Bid fynney" aria-describedby="basic-addon2" onChange={(e) => this.onChangeMyBids(e, 6)}></input>
                                            <div class="input-group-append">
                                                <button class="btn btn-dark" type="button" onClick={() => this.bid(6)} disabled={!(this.state.ContractStatus == 'Auction')}>Сделать ставку</button>
                                            </div>
                                        </div>
                                        <b>Ставка: </b> &nbsp;
                                        <span>{this.web3.fromWei(this.state.myBids[6], 'ether')} eth</span>
                                        <button class="btn btn-dark btn-block" type="button" onClick={() => this.upgradeCar(6)} disabled={!(this.state.ContractStatus == 'PreparationForTheRace')}>Улучшить автомобиль</button>
                                    </div>
                                </div>
                                <div class="card text-white bg-info mb-3" id="cardCar7">
                                    <div class="card-header">Car #8</div>
                                    <div class="card-body">
                                        <b>Номер: </b>&nbsp;
                                        <span>08</span><br />
                                        <b>Мощьность автомобиля: </b>&nbsp;
                                        <span>{this.state.carPowers[7] / 100} л\с</span><br />
                                        <b>Текущая стоимость: </b>&nbsp;
                                        <span>{this.state.highestBids[7]} eth</span><br />
                                        <b>Уровень апгрейдов: </b>&nbsp;
                                        <span>{this.state.carUpgrades[7]} lvl</span><br />
                                        <b>Ваша ставка выйграла: </b>&nbsp;
                                        <span id="car7OwnerText">Да</span><br /><br />
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Bid fynney" aria-label="Bid fynney" aria-describedby="basic-addon2" onChange={(e) => this.onChangeMyBids(e, 7)}></input>
                                            <div class="input-group-append">
                                                <button class="btn btn-dark" type="button" onClick={() => this.bid(7)} disabled={!(this.state.ContractStatus == 'Auction')}>Сделать ставку</button>
                                            </div>
                                        </div>
                                        <b>Ставка: </b> &nbsp;
                                        <span>{this.web3.fromWei(this.state.myBids[7], 'ether')} eth</span>
                                        <button class="btn btn-dark btn-block" type="button" onClick={() => this.upgradeCar(7)} disabled={!(this.state.ContractStatus == 'PreparationForTheRace')}>Улучшить автомобиль</button>
                                    </div>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                <b>Награда победителю (finney):</b> &nbsp;
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Reward eth" aria-label="Reward eth" aria-describedby="basic-addon2" value={this.web3.fromWei(this.state.reward, 'finney')} onChange={(e) => this.onChangeReward(e)}></input>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" onClick={() => this.startAuction()} disabled={!this.state.auctionBtnEnabled}>Запустить аукцион</button>
                                    </div>
                                </div>
                                <b>Награда победителю:</b> &nbsp;
                                <span>{this.web3.fromWei(this.state.reward, 'ether')} eth</span>
                                <br /><br />
                                <b>Невыплаченный баланс:</b> &nbsp;
                                <span>{this.web3.fromWei(this.state.pendingReturn, 'ether')} eth</span>
                                <button class="btn btn-outline-secondary btn-block" type="button" onClick={() => this.withdraw()} disabled={this.state.pendingReturn === 0}>Забрать средства</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Table extends React.Component {
    render() {
        return (
            <table class="table table-hover">
                <thead>
                    {this.genHead()}
                </thead>
                <tbody>
                    {this.genRow()}
                </tbody>
            </table>
        );
    }

    genHead() {
        var head = this.props.head;

        return head.map(function (v, i) {
            return (
                <th key={'th' + i} scope="col">
                    {v}
                </th>
            );
        });
    }

    genRow() {
        var rows = this.props.rows;

        return rows.map(function (v, i) {
            var tmp = v.map(function (v2, j) {
                return (
                    <td key={'td' + i + '_' + j}>
                        {v2}
                    </td>
                );
            });

            return (
                <tr key={'tr' + i}>
                    {tmp}
                </tr>
            )
        });
    }
}

export default App;
