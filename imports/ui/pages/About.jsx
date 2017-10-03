import React from 'react';
export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMeAsHuman: false
        }
        this.showBruce = this.showBruce.bind(this)
    }

    //just showing bruce as human
    //when the trigger is clicked

    //TODO: make this more like a toggle
    //and hide bruce if he's already showing
    //and vice - versa 
    showBruce(e){
        e.preventDefault();
        this.setState({showMeAsHuman: true});
    }
    render() {
        var balmightyWrapperHidden = this.state.showMeAsHuman ? '' : 'hidden';
        return (
            <div className="About page-container">
              <h2><span className="super-accent">B</span>inary <span className="super-accent">R</span>acing in a <span className="super-accent">U</span>nique <span className="super-accent">C</span>ompetitive <span className="super-accent">E</span>nvironment</h2>
              <p>Hello, my name is BRUCE. <br/>Here are my 4 main purposes:</p>
              <p>
                0. Teach humans to learn the basics of binary<br/>
                1. Improve human binary reading muscle memory<br/>
                3. Allow humans to compete against each other (*BRUCE snickers)
              </p>
              <p>
                If I were human, <a href="#" className="balmighty-trigger" onClick={this.showBruce}>this</a> is what I would look like.
              </p>
              <p className={balmightyWrapperHidden}>
                <img src="https://media.giphy.com/media/bAplZhiLAsNnG/giphy.gif" />
              </p>
            </div>
          );
    }
}
