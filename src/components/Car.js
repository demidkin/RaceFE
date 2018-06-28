import React, { Component } from 'react';

class Car extends Component {
    
    bidIsWin(){
        if (this.props.data.mycars[this.props.carIndex]) return "Да"
        else return "Нет"
    }    
    getCardStatus(){
        //console.log(this.props.carIndex)
        //console.log(this.props.data.winner)
        if (this.props.carIndex == this.props.data.winner ) return "bg-danger"
        else if (this.props.data.mycars[this.props.carIndex]) return "bg-success"
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
                        <b>Ваш шанс на победу: </b>&nbsp;
                        <span>{
                            Math.round((this.props.data.carPowers[this.props.carIndex] / this.props.data.allCarsPower) * 10000)/100} %</span><br />
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


export default Car