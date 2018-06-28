import React, { Component } from 'react';
import Car from './Car'


class Cars extends Component {

    render(){
        const carNumbers = [];
        for (let i=0; i< this.props.data.maxCar; i++) carNumbers.push(i);
        const Cars = carNumbers.map((index) =>
            <Car carIndex={index} data={this.props.data} fromWei={this.props.fromWei} setBid={this.props.setBid} onClickBid={this.props.onClickBid} onClickUpgrade={this.props.onClickUpgrade}/>
        );
        return (
            <div>
                {Cars}
            </div>
        );
    } 
}

export default Cars