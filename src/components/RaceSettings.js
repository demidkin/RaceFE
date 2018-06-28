import React, { Component } from 'react';
import ChangeContractAdress from './ChangeContractAdress'

class RaceSettings extends Component {
    render() {
        return (
            <div>
                <br />
                <b>Награда победителю (finney):</b> &nbsp;
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Reward eth" aria-label="Reward eth" aria-describedby="basic-addon2" onChange={(e) => {this.props.setReward(e)}}></input>
                    <div class="input-group-append">
                        <button class="btn btn-success btn-block" type="button" onClick={() => this.props.onClickStartAuction()} disabled={!(this.props.data.ContractStatus === 'Initialising')}>Запустить аукцион</button>
                    </div>
                </div>
                <b>Награда победителю:</b> &nbsp;
                <span>{this.props.fromWei(this.props.data.reward, 'ether')}</span>
                <br />
                <button class="btn btn-danger btn-block" type="button" onClick={() => this.props.onClickCancelAuction()} disabled={!(this.props.data.ContractStatus === 'AuctionFault')}>Отменить аукцион</button>
                <br />
                <button class="btn btn-success btn-block" type="button" onClick={() => this.props.onClickAuctionEnd()} disabled={!(this.props.data.ContractStatus === 'AuctionEnded')}>Завершить аукцион</button>
                <br />
                <button class="btn btn-warning btn-block" type="button" onClick={() => this.props.onClickRace()} disabled={!(this.props.data.ContractStatus === 'RaceIsOver')}>Гонка!</button>
                <br />
                <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#changeContractAddressModal">
                    Сменить адрес контракта
                </button>
                <ChangeContractAdress setContractAddress={this.props.setContractAddress}/>
            </div>
        )}

}

export default RaceSettings