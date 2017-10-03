import React, { Component, PropTypes } from 'react';
import '../styles/GameOver.css'

export default class GameOver extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            marginTop: 50,
            winnerMessage: "EXPLOSIONS!!! Winner!",
            loserMessage: "YOU WERE DEFEATED!"
        }
    }

    // TODO: refactor this code into it's
    //own function that can be called
    //from the componentDidMount function
    //just to make things a little cleaner
    componentDidMount() {

        //this is just the simple animation
        //at the end of the race telling
        //the user wether they won or lost
        this.marqueeInterval = setInterval(() => {
            this.setState({ marginTop: (this.state.marginTop-5) })
            if (this.state.marginTop <= 0) {
                this.setState({ marginTop: 0 })
                clearInterval(this.marqueeInterval);
            }
        }, 300);
    }

    componentWillUnmount() {

        //prevent the interval from
        //being persistent if the user
        //leaves the component before the
        //end of the animation
        clearInterval(this.marqueeInterval);
    }
    render() {

        //if the user won or lost, set
        //the proper message and color
        if (this.props.outcome == '0') {
            accentColor = '#84e997';
            msg = this.state.winnerMessage;
        }else{
            accentColor = 'red';
            msg = this.state.loserMessage;
        }

        return (
            <div className="GameOver-wrapper">
                <div className="overlay-wrapper"><div className="overlay"></div></div>
                <div className="marquee-wrapper" style={{borderColor:accentColor}}>
                    <div className="marquee">
                        <div className="marquee-message" style={{marginTop:this.state.marginTop,color:accentColor}}>{msg}</div>
                    </div>
                </div>
            </div>
        )
    }
}
