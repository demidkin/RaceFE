import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './../css/index.css'

class App extends React.Component{

    constructor(prop){
        super(prop)
        this.state = {  TotalSupply: 1234,
                        MyBalance: 1234,
                        NewMemberAddress: "",
                        ConsoleMessage: "",
                        memberList_head: ['#', 'Member address'],
                        memberList_rows: [],
                        MintTo: "",
                        MintValue: "",
                        PayTo: "",
                        PayValue: "",
                        IncomingPaymants_head: ['#', 'Senders address', 'Value, BreadCoin'],
                        IncomingPaymants_rows: [],
                        SenderAddressToPay: ""
                    }
        
        if(typeof web3 != 'undefined'){
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(web3.currentProvider)
          }else{
            console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        }
          
          var abi = [{"constant":false,"inputs":[{"name":"candidat","type":"address"}],"name":"removeMember","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidat","type":"address"}],"name":"acceptcandidat","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidat","type":"address"}],"name":"rejectcandidat","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"}],"name":"acceptPayment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"toMember","type":"address"}],"name":"rejectMintVoting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCandidatsToRemove","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"toMember","type":"address"},{"name":"value","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"toMember","type":"address"},{"name":"value","type":"uint256"}],"name":"unMint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"}],"name":"paymantValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCoinName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"member","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"toMember","type":"address"}],"name":"acceptUnMint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"payTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"incomingPaymants","outputs":[{"name":"","type":"address[255]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"member","type":"address"},{"name":"phone","type":"uint256"}],"name":"addMember","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMembers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"toMember","type":"address"}],"name":"rejectUnMintVoting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"whereIsMyMoney","outputs":[{"name":"","type":"address[255]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"}],"name":"rejectPayment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getContractStatus","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"toMember","type":"address"}],"name":"acceptMint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidat","type":"address"}],"name":"acceptcandidatToRemove","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCandidatsToAdd","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidat","type":"address"}],"name":"rejectcandidatToRemove","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"candidat","type":"address"}],"name":"NewCandidatVotingToAdd","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"member","type":"address"}],"name":"MemberAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"candidat","type":"address"}],"name":"Rejectedcandidat","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"NewPayment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"PaymentAccepted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"PaymentRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"member","type":"address"}],"name":"MemberRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"member","type":"address"}],"name":"NewCandidatVotingToRemove","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"candidat","type":"address"}],"name":"MemberNotRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"toMember","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"toMember","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"NotMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"toMember","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"NotUnMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"toMember","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"NewMintVoting","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"toMember","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"UnMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"toMember","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"NewUnMintVoting","type":"event"}]
          const MyContract = web3.eth.contract(abi)
          this.state.ContractInstance = MyContract.at("0xdad5d25d91a9d6d0b7b1c0e05d1aa5795cbee226")
    }

    componentDidMount(){
        this.updateState()
        this.setupListeners()
        setInterval(this.updateState.bind(this), 10e3)
    }

    addMember(e){
        this.state.ContractInstance.addMember(this.state.NewMemberAddress,'1234567890',(err, result) => {
            if(result != null){
                this.setState({ ConsoleMessage: result })
                this.setState({ NewMemberAddress: "" }) 
            }
        })
    }
    MintTo(){
        this.state.ContractInstance.mint(this.state.MintTo, parseInt(this.state.MintValue * 10e17), (err, result) => {
            if(result != null){
                this.setState({ ConsoleMessage: result })
                this.setState({ MintValue: "" }) 
            }
        })
    }
    PayTo(){
        this.state.ContractInstance.payTo(this.state.PayTo, parseInt(this.state.PayValue * 10e17), (err, result) => {
            if(result != null){
                this.setState({ ConsoleMessage: result })
                this.setState({ PayValue: "" }) 
            }
        })
    }
    AcceptPayFrom(){
        this.state.ContractInstance.acceptPayment(this.state.SenderAddressToPay, (err, result) => {
            if(result != null){
                this.setState({ ConsoleMessage: result })
                this.setState({ SenderAddressToPay: "" })
            }
        })
    }
    RejectPayFrom(){
        this.state.ContractInstance.rejectPayment(this.state.SenderAddressToPay, (err, result) => {
            if(result != null){
                this.setState({ ConsoleMessage: result })
                this.setState({ SenderAddressToPay: "" })
            }
        })
    }

    onChangeSenderAddressToPay(e){
        this.setState({ SenderAddressToPay: e.target.value })
    }

    onChangeAddMember(e){
        this.setState({ NewMemberAddress: e.target.value })
    }

    onChangeMintTo(e){
        this.setState({ MintTo: e.target.value })
    }

    onChangePayTo(e){
        this.setState({ PayTo: e.target.value })
    }

    onChangeMintValue(e){
        this.setState({ MintValue: e.target.value })
    }

    onChangePayValue(e){
        this.setState({ PayValue: e.target.value })
    }

    updateState(){
        this.state.ContractInstance.totalSupply((err, result) => {
            if(result != null){
                this.setState({ TotalSupply: parseFloat(web3.fromWei(result, 'ether')) })
            }
        })

        this.state.ContractInstance.getMembers((err, result) => {
            if(result != null){
                let rows = [];
                for (let i=0; i < result.length; i++){
                    rows.push([i+1, result[i]]);
                }
                
                this.setState({ memberList_rows: rows })
            }
        })

        this.state.ContractInstance.incomingPaymants((err, result) => {
            if(result != null){
                if (parseInt(result[0]) === 0) this.setState({ IncomingPaymants_rows: [] })
                else{
                    let rows = [];
                    for (let i=0; i < result.length; i++){
                        if (parseInt(result[i]) !== 0) {
                            this.state.ContractInstance.paymantValue(result[i],web3.eth.accounts[0],(err, value) => {
                                if (value != undefined){
                                    rows.push([i+1, result[i], parseFloat(web3.fromWei(value, 'ether'))])
                                    this.setState({ IncomingPaymants_rows: rows })
                                }
                            })
                        }
                    }
                }
            }
        })

        if (web3.eth.accounts.length > 0)
            this.state.ContractInstance.balanceOf(web3.eth.accounts[0],(err, result) => {
                if(result != null){
                    this.setState({ MyBalance: parseFloat(web3.fromWei(result, 'ether')) })
                }
            })
    }
    setupListeners(){
        // let liNodes = this.refs.numbers.querySelectorAll('li')
        // liNodes.forEach(number => {
        //    number.addEventListener('click', event => {
        //       event.target.className = 'number-selected'
        //       this.voteNumber(parseInt(event.target.innerHTML), done => {
        //          // Remove the other number selected
        //          for(let i = 0; i < liNodes.length; i++){
        //             liNodes[i].className = ''
        //          }
        //       })
        //    })
        // })
    }
    render(){
        return (
            <div class="container">
                <br/>
                <div className="block">
                <b>Total Supply:</b> &nbsp;
                <span>{this.state.TotalSupply}</span>
                </div>
                <div className="block">
                <b>My Balance:</b> &nbsp;
                <span>{this.state.MyBalance}</span>
                </div>
                <div className="block">
                <b>Message:</b> &nbsp;
                <span>{this.state.ConsoleMessage}</span>
                </div>

                <div> 
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="memberlist-tab" data-toggle="tab" href="#memberlist" role="tab" aria-controls="memberlist" aria-selected="true">Member List</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="payments-tab" data-toggle="tab" href="#payments" role="tab" aria-controls="payments" aria-selected="false">Payments</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="minting-tab" data-toggle="tab" href="#minting" role="tab" aria-controls="minting" aria-selected="false">Minting</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="memberlist" role="tabpanel" aria-labelledby="memberlist-tab">
                            <br />
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Member address" aria-label="Member address" aria-describedby="basic-addon2" value={this.state.NewMemberAddress} onChange={(e) => this.onChangeAddMember(e)}/>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" onClick={() => this.addMember()}>Add</button>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Table head={this.state.memberList_head} rows={this.state.memberList_rows} />
                            </div>   

                        </div>
                        <div class="tab-pane fade" id="payments" role="tabpanel" aria-labelledby="payments-tab">
                            <br />
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Member address to pay" aria-label="Member address to pay" aria-describedby="basic-addon2" value={this.state.PayTo} onChange={(e) => this.onChangePayTo(e)}/>
                                <input type="text" class="form-control" placeholder="Value" aria-label="Value" aria-describedby="basic-addon2" value={this.state.PayValue} onChange={(e) => this.onChangePayValue(e)}/>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" onClick={() => this.PayTo()}>Pay</button>
                                </div>                               
                            </div>   
                            <br />
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Senders address" aria-label="Senders address" aria-describedby="basic-addon2" value={this.state.SenderAddressToPay} onChange={(e) => this.onChangeSenderAddressToPay(e)}/>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" onClick={() => this.AcceptPayFrom()}>Accept</button>
                                    <button class="btn btn-outline-secondary" type="button" onClick={() => this.RejectPayFrom()}>Reject</button>
                                </div>                               
                            </div>
                            <hr />
                            <b>Incoming payments:</b> &nbsp;
                            <div>
                                <Table head={this.state.IncomingPaymants_head} rows={this.state.IncomingPaymants_rows} />
                            </div>                           
                        </div>
                        <div class="tab-pane fade" id="minting" role="tabpanel" aria-labelledby="minting-tab">
                            <br />
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Member address to mint" aria-label="Member address to mint" aria-describedby="basic-addon2" value={this.state.MintTo} onChange={(e) => this.onChangeMintTo(e)}/>
                                <input type="text" class="form-control" placeholder="Value" aria-label="Value" aria-describedby="basic-addon2" value={this.state.MintValue} onChange={(e) => this.onChangeMintValue(e)}/>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" onClick={() => this.MintTo()}>Mint</button>
                                </div>
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

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)