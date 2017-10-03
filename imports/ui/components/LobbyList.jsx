import React, { Component, PropTypes } from 'react';
import '../styles/LobbyList.css'
import FaGamepad from 'react-icons/lib/fa/gamepad'

export default class LobbyList extends React.Component {

    //Handle the user's click
    //event to grab the user id
    //they chose to compete against
    //and send that back to the Lobby component
    pairPlayersHandler(uid){
        this.props.pairPlayers(uid);
    }

    render() {

        //just alternating colors
        //in the player list UI
        var extraclass = "color1";
            extraclass = ((this.props.cn+1) % 2 == 0) ? "color2" : extraclass;
            extraclass = ((this.props.cn+1) % 3 == 0) ? "color3" : extraclass;
            shouldhide = ((this.props.myID != this.props.id) ? '' : " hidden");


        return (
            <span
                className={"LobbyList" + shouldhide}
                data-mod={extraclass}
                data-uid={this.props.id}
                onClick={this.pairPlayersHandler.bind(this, this.props.id)}
            >
                <span className="player-trigger">
                    <FaGamepad />{this.props.id}
                </span>
            </span>
        )
    }
}
