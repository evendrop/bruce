import React, { Component, PropTypes } from 'react';
import '../styles/Scoreboard.css'

//just the progress bars
//you see during the race
export default class Scoreboard extends React.Component {

    render() {

        //the width of the progress Bar
        //for the good guys and bad guys
        const ggwidth = this.props.ggwidth + '%';
        const bgwidth = this.props.bgwidth + '%';

        return (
            <div className="Scoreboard-wrapper">
                <div className="GoodGuys-container player-score-container">
                    <div className="label">GOOD GUYS</div>
                    <div className="the-score-container">
                        <div className="the-score-psuedo"></div>
                        <div className="the-score" style={{width:ggwidth}}></div>
                    </div>
                </div>
                <div className="BadGuys-container player-score-container">
                    <div className="label">BAD GUYS</div>
                    <div className="the-score-container">
                        <div className="the-score-psuedo"></div>
                        <div className="the-score" style={{width:bgwidth}}></div>
                    </div>
                </div>
            </div>
        )
    }
}
