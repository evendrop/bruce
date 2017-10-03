import React, { Component, PropTypes } from 'react';
import '../styles/Binaries.css'

export default class Binaries extends React.Component {

    constructor(props) {
        super(props);
    }

    //this component handles displaying
    //the list of binary codes the user will
    //see during the race.

    //the binaryCursor is the current position
    //of the correct answers entered by the user.

    render() {
        extraClass = '';
        if (this.props.id < (this.props.binaryCursor)) {
            extraClass = 'correct';
        }
        return (
            <span className={"Binaries-item-wrapper " + extraClass}>
                <span>{this.props.binary}</span>
            </span>
        )
    }
}
