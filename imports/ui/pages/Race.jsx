import React, { Component, PropTypes } from 'react';
import { createContainer }             from 'meteor/react-meteor-data';

import Scoreboard from '../components/Scoreboard.jsx'
import Binaries from '../components/Binaries.jsx'
import SoapBox from '../components/SoapBox.jsx'
import GameOver from '../components/GameOver.jsx'

//data we need access to from the
//document storage
import { Races }              from '../../api/Races.js';

//import binary datasets
import BinaryData from '../BinaryDataSets/4bit/DataSet.js'

export default class Race extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            binaryCursor: 0,
            badGuyScore: 0,
            gameover: false
        }
        this.correctAnswerHandler = this.correctAnswerHandler.bind(this);
        this.enGame = this.endGame.bind(this);
    }

    componentWillMount(){

    }

    componentDidMount(){
        this.setState({
            raceID: this.props.match.params.raceid,
            myID:   this.props.match.params.myid,
        })

        //get the current race document
        //from the database. It's id is
        //the first url parameter passed to
        //this page.
        const thisrace  = Races.findOne({_id: this.props.match.params.raceid});

        //TODO: refactor, it's sloppy but works

        //we just need to know if I'm player 1
        //or my opponent is plaer 1, in this
        //instance of the race.
        this.setState({
            playerKey: ((thisrace.player1ID == this.props.match.params.myid) ? 'player1' : 'player2')
        })

        //observer for the race changes.
        RacePipeline = Races.find();
        RacePipeline.observeChanges({
            changed: function(id, fields) {
                if (id == this.state.raceID) {
                    if (this.state.playerKey == 'player1') {
                        if (fields.player2Score != undefined) {
                            this.setState({
                                badGuyScore: this.state.badGuyScore+1
                            })
                        }
                    }else{
                        if (fields.player1Score != undefined) {
                            this.setState({
                                badGuyScore: this.state.badGuyScore+1
                            })
                        }
                    }
                    if (fields.gameover != undefined) {
                        raceState = (Races.findOne({_id: this.props.match.params.raceid}));
                        if (this.state.playerKey == 'player1') {
                            if (raceState.player1Score > raceState.player2Score) {
                                this.setState({
                                    outcome: 0
                                })
                            }else{
                                this.setState({
                                    outcome: 1
                                })
                            }
                        }else{
                            if (raceState.player2Score > raceState.player1Score) {
                                this.setState({
                                    outcome: 0
                                })
                            }else{
                                this.setState({
                                    outcome: 1
                                })
                            }
                        }
                        outcome = (((this.state.binaryCursor+1) >= BinaryData.DataSet.length) ? 0 : 1 )
                        this.setState({
                            gameover: true
                        })
                    }
                }
            }.bind(this)
        });
    }

    //incrementing the player's
    //score in the database, as they
    //provide correct answers
    correctAnswerHandler(){
        this.setState({binaryCursor: this.state.binaryCursor+1});
        if (this.state.playerKey == 'player1') {
            Races.update(this.props.match.params.raceid, {
                $inc: {
                    player1Score: 1
                }
            });
        }else{
            Races.update(this.props.match.params.raceid, {
                $inc: {
                    player2Score: 1
                }
            });
        }

        //check if we should end the game
        this.endGame();
    }

    //end the game?
    endGame(){
        if (((this.state.binaryCursor+1) >= BinaryData.DataSet.length)) {
            Races.update(this.props.match.params.raceid, {
                $inc: {
                    gameover: 1
                }
            });
        }
    }

    //self explanatory: loop through
    //the DataSet binaries and display
    //the component
    renderBinaries(){
        return BinaryData.DataSet.map((binary, index) => (
            <Binaries key={index} binary={binary} id={index} binaryCursor={this.state.binaryCursor} />
        ));
    }

    render(){
        return (
            <div className="race-super-wrapper">
                <div className="Scoreboard-super-wrapper">
                    <Scoreboard ggwidth={(this.state.binaryCursor / BinaryData.DataSet.length)*100} bgwidth={(this.state.badGuyScore / BinaryData.DataSet.length)*100} />
                </div>
                <div className="Binaries-super-wrapper">
                    {this.renderBinaries()}
                </div>
                <div className="Stage-super-wrapper">
                    <SoapBox binaries={BinaryData.DataSet} correctAnswerHandler={this.correctAnswerHandler} />
                </div>
                {this.state.gameover ? <div className="GameOver-super-wrapper"><GameOver outcome={this.state.outcome} /></div> : null}
            </div>
        )
    }
}
