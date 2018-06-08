import React, { Component } from 'react';
import Web3 from 'web3';

class App extends React.Component{
    
    constructor(prop){
        super(prop)
        this.state = {  AuctionEndDate: "",
                        RaceStartDate: "",
                        UserToken_head: ["#", "Token"],
                        UserToken_rows: []
                    }

        let web3 = window.web3
        if(typeof window.web3 != 'undefined'){
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(web3.currentProvider)
          }else{
            console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        }
          
        var abi = [];
        this.contractAddress = "0x49905E685e1144A6eA2DC70f1Fc7d8444B4B3bA0";
        const MyContract = web3.eth.contract(abi)
        this.state.ContractInstance = MyContract.at(this.contractAddress)
    }

    componentDidMount(){
        this.updateState()
        this.setupListeners()
        setInterval(this.updateState.bind(this), 10e3)
    }

    BuyToken(){
        let data = this.state.Name + " " + this.state.Mail
        var functionData = this.state.ContractInstance.createNewToken.getData(data);
        this.web3.eth.sendTransaction({
            to: this.contractAddress,
            from: this.web3.eth.accounts[0],
            data: functionData,
            value: this.web3.toWei(10, "finney")
        },
            function (error) {
                console.log(error);
            }
        )
    }

    onChangeUserName(e){
        this.setState({ Name: e.target.value })
    }
    onChangeMail(e){
        this.setState({ Mail: e.target.value })
    }

    updateState(){
        this.state.ContractInstance.getMyToken((err, result) => {
            console.log(result)
            if(result != null){
                let rows = [];
                for (let i=0; i < result.length; i++){
                    console.log(result[i])
                    rows.push([i+1, result[i].toString()]);
                }
                this.setState({ UserToken_rows: rows })
            }
        })
    }

    setupListeners(){
    }

    render(){
        return (
            <div class="container">
                <br/>
                <div className="block">
                <b>Name:</b> &nbsp;
                <span><input type="text" class="form-control" placeholder="User name" aria-label="User name" aria-describedby="basic-addon2" value={this.state.Name} onChange={(e) => this.onChangeUserName(e)}/></span>
                </div>
                <div className="block">
                <b>Mail:</b> &nbsp;
                <span><input type="text" class="form-control" placeholder="Mail" aria-label="Mail" aria-describedby="basic-addon2" value={this.state.Mail} onChange={(e) => this.onChangeMail(e)}/></span>
                </div>
                <br/>
                <button type="button" class="btn btn-success btn-lg btn-block" onClick={(e) => this.BuyToken(e)}>Buy</button>
                <hr />
                <b>Your tokens:</b> &nbsp;
                <div>
                    <Table head={this.state.UserToken_head} rows={this.state.UserToken_rows} />
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
  
      return head.map(function(v, i) {
        return (
          <th key={'th' + i} scope="col">
            {v}
          </th>
        );
      });
    }
  
    genRow() {
      var rows = this.props.rows;
  
      return rows.map(function(v, i) {
        var tmp = v.map(function(v2, j) {
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
