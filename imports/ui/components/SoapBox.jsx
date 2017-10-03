import React, { Component, PropTypes } from 'react';
import '../styles/SoapBox.css'

//the user input box
export default class SoapBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            SoapBoxUserInputCursor: 0,
            SoapBoxInput: '',
            inputColorClass: 'awesome',
            CoverPlateText: "Race starts in: 5s...",
            CoverPlateExtraClass: "coverplate-wrapper"
        }

        this.ai = this.ai.bind(this)

        //making ai function available
        //in console
        window.ai = this.ai;

    }

    //TODO: I don't like this being in
    //the componentDidMount function
    //we need to move this functionality to
    //it's own function to clean things up

    //this is just the beginning animation of
    //the race when the countdown appears
    componentDidMount(){
        countdownMaxIntervals = countdown = 4;
        index = 0;
        countdownInterval = setInterval(function(){
            if (index <= countdownMaxIntervals) {

                this.setState({
                    CoverPlateText: "Race starts in: " + countdown + "s..."
                });

                if (countdown == 0) {
                    this.setState({
                        CoverPlateText: "Go!"
                    });
                }

            }else{
                this.setState({
                    CoverPlateExtraClass: "coverplate-wrapper hidden"
                })
                clearInterval(countdownInterval);
            }
            index++;
            countdown--;
        }.bind(this), 1000);
    }

    //it's nice to have a way to race
    //against something when you're all
    //by yourself. Open console and type
    //ai(4000)
    ai(milliseconds){

        //TODO: answers are hard coded for now
        //if you change the binary object in
        //DataSets.js, this ai function no longer works
        //we need to make this dynamic
        answers = ["3", "14", "0", "5", "13", "2"];
        index = 0;

        aiInterval = setInterval(function(){
            if (index < answers.length) {

                this.refs.SoapBoxInput = answers[index]
                this.setState({
                    SoapBoxInput: answers[index],
                    SoapBoxUserInputCursor: index
                });
                this.SoapBoxSubmitHandler();

            }else{
                clearInterval(aiInterval);
            }
            index++;
        }.bind(this), milliseconds);
    }

    //we don't want alpha, decimal, or
    //special chars to be valid in the
    //user's input. Here, we get to sanitize
    //the input. Every time the input field
    //has a change, we run this.
    SoapBoxInputChangeHandler(evt) {
        const SoapBoxInput = (evt.target.validity.valid) ? evt.target.value : this.state.SoapBoxInput;
        this.setState({ SoapBoxInput });
    }

    //When the user presses enter
    //we check to see if they were right
    //or wrong
    SoapBoxSubmitHandler(e){

        if (e != undefined){
            e.preventDefault();
        }

        //there is a really nice feature of
        //ES6 that converts a binary number
        //that has 0b in front of it, to a
        //whole number

        //TODO: I've always read that eval is
        //bad, we may need to refactor this
        //code in the future. Seems harmless
        //ATM
        binaryRaw = "0b"+this.props.binaries[this.state.SoapBoxUserInputCursor];
        binaryConverted = parseInt(eval(binaryRaw));

        //obviously, handles correct or
        //incorrect
        if (this.state.SoapBoxInput == binaryConverted) {
            this.setState({
                SoapBoxInput:"",
                SoapBoxUserInputCursor: this.state.SoapBoxUserInputCursor+1,
                inputColorClass: 'awesome'
            });
            this.setState({SoapBoxUserInputCursor: this.state.SoapBoxUserInputCursor+1});
            this.props.correctAnswerHandler(this.state.SoapBoxUserInputCursor);
        }else{
            this.setState({
                SoapBoxInput:"",
                inputColorClass: 'boo'
            });
        }
    }

    render() {
        return (
            <div className={"SoapBox-wrapper " + this.state.inputColorClass}>
                <form className="SoapBox-form" onSubmit={this.SoapBoxSubmitHandler.bind(this)} ref="SoapBoxInputForm">
                    <input type="text" maxLength="4" pattern="[0-9]*" onInput={this.SoapBoxInputChangeHandler.bind(this)} value={this.state.SoapBoxInput} ref="SoapBoxInput" />
                </form>
                <div className={this.state.CoverPlateExtraClass}>
                    <div className="overlay-wrapper"><div className="overlay"></div></div>
                    <div className="coverplate-text-wrapper">
                        <div className="coverplate-text">
                            {this.state.CoverPlateText}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
