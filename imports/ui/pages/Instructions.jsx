import React from 'react';
import { Link } from 'react-router-dom';

export default class About extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="Instructions page-container">
                <h2>The binary conversion</h2>
                <p>
                    I will give you a 4 bit binary code.<br/>
                    You will convert that code to (only) an integer.<br/>
                </p>
                <h2>Invalid conversions</h2>
                <br/>
                    <ul>
                        <li>alpha</li>
                        <li>decimal</li>
                        <li>special chars</li>
                    </ul>
                <br/>
                <h2>Binary basics</h2>
                <br/>
                    <ul>
                        <li>important*: binary reads right to left</li>
                        <li>1 = on; 0 = off</li>
                        <li>The bit doubles itself from the<br/> previous position (8 &lt; 4 &lt; 2 &lt; 1)</li>
                    </ul>
                <br/>
                <h2>Examples</h2>
                <p>
                    <span className="bin-example">
                    0101 = 5
                    </span>
                    <br/>
                    <span className="bin-example">
                    0111 = 7
                    </span>
                    <br/>
                    <span className="bin-example">
                    1000 = 8
                    </span>
                </p>
                <p>
                    Now go to <Link to="/lobby">the lobby</Link> and race someone.
                </p>
            </div>
          );
    }
}
