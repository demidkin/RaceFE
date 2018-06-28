import React, { Component } from 'react';
import { connect } from 'react-redux';

class RaceInfo extends Component {
    
    withdraw() {
        this.props.onWithdraw();
    }

    render() {
        return (
                <div class="card text-white bg-dark mb-3">
                    <div class="card-header">RACE <a href={"https://rinkeby.etherscan.io/address/"+this.props.contractAddress}>(Etherscan)</a></div>
                    <div class="card-body">
                        <b>Статус контракта:</b>&nbsp;
                        <span>{this.props.data.ContractStatus}</span> <br />
                        <b>Дата завершения аукциона:</b> &nbsp;
                        <span>{this.props.data.AuctionEndDate}</span><br />
                        <b>Дата начала соревнований:</b> &nbsp;
                        <span>{this.props.data.RaceStartDate}</span><br />
                        <b>Награда победителю:</b>&nbsp;
                        <span>{this.props.fromWei(this.props.data.ContractReward, 'ether')}</span><br />
                        <b>Ваш невыплаченный баланс:</b>&nbsp;
                        <span>{this.props.fromWei(this.props.data.pendingReturn, 'ether')}</span> &nbsp;
                        <button class="btn btn-warning" type="button" onClick={this.withdraw.bind(this)}>Забрать средства</button>
                    </div>
                </div>
        )}
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
)(RaceInfo);

//() => this.props.onClick() disabled={this.props.data.pendingReturn === 0}