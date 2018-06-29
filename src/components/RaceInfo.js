import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromWei } from '../utils/web3'
import { withdraw } from '../actions/withdraw'

class RaceInfo extends Component {

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
                        <span>{fromWei(this.props.data.ContractReward)}</span><br />
                        <b>Ваш невыплаченный баланс:</b>&nbsp;
                        <span>{fromWei(this.props.data.pendingReturn)}</span> &nbsp;
                        <button class="btn btn-warning" type="button" onClick={this.props.onWithdraw}>Забрать средства</button>
                    </div>
                </div>
        )}
}

export default connect(
    state => ({
    }),
    dispatch => ({
        onWithdraw: () => {
            dispatch(withdraw())
        }
    })
)(RaceInfo);

//() => this.props.onClick() disabled={this.props.data.pendingReturn === 0}