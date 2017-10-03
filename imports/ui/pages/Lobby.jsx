import React, { Component, PropTypes } from 'react';
import { createContainer }             from 'meteor/react-meteor-data';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LobbyList from '../components/LobbyList.jsx'

//data we need access to from the
//document storage
import { WaitingRoomPlayers } from '../../api/WaitingRoomPlayers.js';
import { Handshakes }         from '../../api/Handshakes.js';
import { Races }              from '../../api/Races.js';

class Lobby extends React.Component {

    constructor(props){
        super(props);

        this.state = {myID: false};

        //we also need to remove the player from
        //the lobby if they refresh the page or
        //navigate out of the app for any reason
        window.addEventListener("beforeunload", () => {
            WaitingRoomPlayers.remove({_id: this.state.myID});
        });

        //bind the pair players function
        this.pairPlayers = this.pairPlayers.bind(this);
    }

    componentWillMount(){

        //when a player lands in the lobby, let's
        //automatically create a record for them
        //and return the id to the state
        WaitingRoomPlayers.insert({
            text: "New Player Added !",
            createdAt: new Date()
        }, function(err, id){
            this.setState({myID: id});
        }.bind(this));

        //when a player is clicked from
        //the lobby, we need to listen for
        //incoming challenges
        incomingHandshakeRequest = Handshakes.find();
        incomingHandshakeRequest.observeChanges({
            added: function(id, object) {
                this.handshakeWasAdded(object);
            }.bind(this)
        });
    }

    handshakeWasAdded(object){

        //is the handshake for me? or
        //someone else that's listening!?
        if (object.targetID == this.state.myID) {

            //all we have to do now is
            //redirect the player to
            //the url that was already
            //created and added to the
            //document storage
            this.props.history.push(object.raceBaseURL+this.state.myID)
        }
    }

    componentWillUnmount(){

        //if they are still in the app but move
        //to a different page in the app, we need
        //to remove them from the lobby by removing
        //their record from the document storage
        WaitingRoomPlayers.remove({_id: this.state.myID});
    }

    //this is ran when a player
    //clicks on an id to challenge
    //from the lobby
    pairPlayers(uid){
        if (uid != this.state.myID) {

            //create the race first so
            //that we know what url to sends
            //the opponent to
            Races.insert({
                text: "New Race !",
                player1ID: this.state.myID,
                player2ID: uid,
                player1Score: 0,
                player2Score: 0,
                gameover: 0,
                createdAt: new Date()
            }, function(err, raceid){

                //let the opponent know
                //they have a pending challenge
                Handshakes.insert({
                    requesterID: this.state.myID,
                    targetID: uid,
                    raceBaseURL: '/race/'+raceid+'/',
                    createdAt: new Date()
                }, function(err, id){
                    this.props.history.push('/race/'+raceid+'/'+this.state.myID)
                }.bind(this));
            }.bind(this));
        }else{
            alert("umm... that's you, silly.");
        }
    }

    //we created a container for the fetch
    //of the players out of storage, now we
    //need to pass those players to the lobby
    //list component
    renderPlayers() {
        return this.props.queuedPlayers.map((player, index) => (
            <LobbyList key={player._id.toString()} myID={this.state.myID} cn={index} id={player._id.toString()} player={player.text} pairPlayers={this.pairPlayers} />
        ));
    }

    render(){
        return (
            <div className="lobby-super-wrapper">
                <div className="LobbyList-wrapper">
                    <h3>Choose an opponent</h3>
                    <div className="my-id"><span>You: </span>{this.state.myID}</div>
                    {this.renderPlayers()}
                </div>
            </div>
        )
    }
}

//just gets the players from the document
//storage and sends them to the Lobby Component
export default createContainer((props) => {
  return {
    queuedPlayers: WaitingRoomPlayers.find({}).fetch()
  };
}, Lobby);
